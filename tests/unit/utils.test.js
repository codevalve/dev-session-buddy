import { jest } from '@jest/globals';
import * as utils from '../../src/utils.js';
import { promises as fsPromises } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

// Mock dependencies
const mockFsPromises = {
  readFile: jest.fn(),
  writeFile: jest.fn()
};

jest.mock('fs', () => ({
  promises: mockFsPromises
}));

const mockExec = jest.fn();
jest.mock('child_process', () => ({
  exec: (cmd, cb) => mockExec(cmd, cb)
}));

// Mock yaml
const mockYaml = {
  load: jest.fn(),
  dump: jest.fn()
};

jest.mock('js-yaml', () => mockYaml);

describe('Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getToolVersion', () => {
    test('should return version from command execution', async () => {
      mockExec.mockImplementation((cmd, cb) => cb(null, { stdout: 'v1.2.3' }));
      const result = await utils.getToolVersion('git --version');
      expect(result).toMatch(/^v\d+\.\d+\.\d+$/);
    });

    test('should return null on error', async () => {
      mockExec.mockImplementation((cmd, cb) => cb(new Error('Command failed')));
      const result = await utils.getToolVersion('invalid-command');
      expect(result).toBeNull();
    });
  });

  describe('parseVersion', () => {
    test('should parse version string with v prefix', () => {
      const result = utils.parseVersion('v1.2.3');
      expect(result).toBe('v1.2.3');
    });

    test('should parse version string without v prefix', () => {
      const result = utils.parseVersion('1.2.3');
      expect(result).toBe('v1.2.3');
    });
  });

  describe('checkVersion', () => {
    test('should compare versions correctly', () => {
      expect(utils.checkVersion('v2.0.0', 'v1.0.0')).toBe(true);
      expect(utils.checkVersion('2.1.0', '2.0.0')).toBe(true);
      expect(utils.checkVersion('v1.0.0', 'v2.0.0')).toBe(false);
    });
  });

  describe('configuration', () => {
    const mockConfig = {
      framework: 'vue',
      dependencies: {
        required: ['vue', 'vite'],
        dev: ['jest', 'eslint']
      }
    };

    const mockYamlContent = 'framework: vue\ndependencies:\n  required:\n    - vue\n    - vite\n  dev:\n    - jest\n    - eslint\n';

    beforeEach(() => {
      mockFsPromises.readFile.mockResolvedValue(mockYamlContent);
      mockYaml.load.mockReturnValue(mockConfig);
      mockYaml.dump.mockReturnValue(mockYamlContent);
    });

    test('should load configuration', async () => {
      const result = await utils.loadConfig('config.yaml');
      expect(result).toEqual(mockConfig);
      expect(mockYaml.load).toHaveBeenCalledWith(mockYamlContent);
    });

    test('should handle load errors', async () => {
      mockFsPromises.readFile.mockRejectedValue(new Error('File not found'));
      await expect(utils.loadConfig('invalid.yaml')).rejects.toThrow('Failed to load configuration');
    });

    test('should save configuration', async () => {
      await utils.saveConfig('config.yaml', mockConfig);
      expect(mockYaml.dump).toHaveBeenCalledWith(mockConfig);
      expect(mockFsPromises.writeFile).toHaveBeenCalledWith(
        'config.yaml',
        mockYamlContent,
        'utf8'
      );
    });
  });
});
