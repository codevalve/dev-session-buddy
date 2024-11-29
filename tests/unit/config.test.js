import { readFileSync } from 'fs';
import { join } from 'path';
import yaml from 'yaml';

describe('Configuration Files', () => {
  test('default.yaml has valid syntax', () => {
    const configPath = join(process.cwd(), 'config', 'default.yaml');
    const configContent = readFileSync(configPath, 'utf8');
    expect(() => yaml.parse(configContent)).not.toThrow();
  });

  test('default config has required fields', () => {
    const configPath = join(process.cwd(), 'config', 'default.yaml');
    const config = yaml.parse(readFileSync(configPath, 'utf8'));
    
    expect(config).toHaveProperty('tools.required');
    expect(Array.isArray(config.tools.required)).toBe(true);
    expect(config.tools.required).toContain('git');
  });
});
