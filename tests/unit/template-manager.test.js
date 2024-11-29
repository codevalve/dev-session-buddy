import { jest } from '@jest/globals';
import { TemplateManager } from '../../src/template-manager.js';
import path from 'path';

// Mock dependencies
const mockFsPromises = {
  mkdir: jest.fn().mockResolvedValue(undefined),
  readdir: jest.fn().mockResolvedValue(['config-template.yaml', 'package.json']),
  copyFile: jest.fn().mockResolvedValue(undefined),
  stat: jest.fn().mockResolvedValue({ isDirectory: () => false }),
  chmod: jest.fn().mockResolvedValue(undefined)
};

jest.mock('fs', () => ({
  promises: mockFsPromises
}));

const mockTemplateConfig = {
  dependencies: {
    required: ['vue', 'vite'],
    dev: ['jest', 'eslint']
  }
};

const mockUtils = {
  loadConfig: jest.fn().mockResolvedValue(mockTemplateConfig),
  saveConfig: jest.fn().mockResolvedValue(undefined),
  copyDir: jest.fn().mockResolvedValue(undefined),
  getTemplatePath: jest.fn().mockReturnValue('/templates/vue')
};

jest.mock('../../src/utils.js', () => mockUtils);

// Mock path
const mockPath = {
  join: jest.fn().mockImplementation((...args) => args.join('/')),
  resolve: jest.fn().mockImplementation((...args) => args.join('/'))
};

jest.mock('path', () => mockPath);

describe('TemplateManager', () => {
  let templateManager;
  const projectDir = '/test/project';
  const framework = 'vue';
  const preset = 'default';

  beforeEach(() => {
    templateManager = new TemplateManager();
    jest.clearAllMocks();
  });

  describe('Template Application', () => {
    test('should create project directory', async () => {
      await templateManager.applyTemplate(projectDir, framework, preset);
      
      expect(mockFsPromises.mkdir).toHaveBeenCalledWith(
        projectDir,
        { recursive: true }
      );

      // Verify essential directories are created
      const essentialDirs = ['src', 'tests', 'docs', '.dev-session-buddy'];
      essentialDirs.forEach(dir => {
        expect(mockFsPromises.mkdir).toHaveBeenCalledWith(
          projectDir + '/' + dir,
          { recursive: true }
        );
      });
    });

    test('should copy template files', async () => {
      await templateManager.applyTemplate(projectDir, framework, preset);

      expect(mockUtils.getTemplatePath).toHaveBeenCalledWith(framework);
      expect(mockUtils.loadConfig).toHaveBeenCalledWith(
        '/templates/vue/config-template.yaml'
      );
      expect(mockUtils.copyDir).toHaveBeenCalled();
    });

    test('should save project configuration', async () => {
      await templateManager.applyTemplate(projectDir, framework, preset);

      expect(mockUtils.saveConfig).toHaveBeenCalledWith(
        projectDir + '/dev-session-buddy.yaml',
        expect.objectContaining({
          framework,
          preset,
          dependencies: mockTemplateConfig.dependencies,
          createdAt: expect.any(String)
        })
      );
    });

    test('should handle errors gracefully', async () => {
      mockFsPromises.mkdir.mockRejectedValue(new Error('Failed to create directory'));
      
      await expect(
        templateManager.applyTemplate(projectDir, framework, preset)
      ).rejects.toThrow('Failed to apply template');
    });
  });
});
