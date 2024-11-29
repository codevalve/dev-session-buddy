import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

describe('Configuration Files', () => {
  test('default.yaml has valid syntax', () => {
    const configPath = path.join(process.cwd(), 'config', 'default.yaml');
    const configContent = fs.readFileSync(configPath, 'utf8');
    expect(() => yaml.load(configContent)).not.toThrow();
  });

  test('default config has required fields', () => {
    const configPath = path.join(process.cwd(), 'config', 'default.yaml');
    const config = yaml.load(fs.readFileSync(configPath, 'utf8'));
    
    expect(config).toHaveProperty('tools.required');
    expect(Array.isArray(config.tools.required)).toBe(true);
    expect(config.tools.required).toContain('git');
  });
});
