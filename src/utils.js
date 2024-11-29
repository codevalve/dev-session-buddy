import { promises as fsPromises } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import yaml from 'js-yaml';

const execAsync = promisify(exec);

/**
 * Check if a command exists in the system
 * @param {string} command - Command to check
 * @returns {Promise<boolean>} - True if command exists
 */
export async function commandExists(command) {
  try {
    const { stdout } = await execAsync(`command -v ${command}`);
    return !!stdout;
  } catch {
    return false;
  }
}

/**
 * Get version of a tool from command line
 * @param {string} command - Command to execute
 * @returns {Promise<string|null>} - Version string or null if error
 */
export async function getToolVersion(command) {
  try {
    const { stdout } = await execAsync(command);
    return parseVersion(stdout.trim());
  } catch {
    return null;
  }
}

/**
 * Parse version string
 * @param {string} version - Version string
 * @returns {string} - Normalized version string
 */
export function parseVersion(version) {
  return version.startsWith('v') ? version : `v${version}`;
}

/**
 * Check if version meets minimum requirement
 * @param {string} version - Version to check
 * @param {string} minVersion - Minimum version required
 * @returns {boolean} - True if version meets requirement
 */
export function checkVersion(version, minVersion) {
  const v1 = version.replace('v', '').split('.').map(Number);
  const v2 = minVersion.replace('v', '').split('.').map(Number);
  
  for (let i = 0; i < 3; i++) {
    if (v1[i] > v2[i]) return true;
    if (v1[i] < v2[i]) return false;
  }
  return true;
}

/**
 * Load YAML configuration file
 * @param {string} configPath - Path to config file
 * @returns {Promise<object>} - Configuration object
 */
export async function loadConfig(configPath) {
  try {
    const content = await fsPromises.readFile(configPath, 'utf8');
    return yaml.load(content);
  } catch (error) {
    throw new Error(`Failed to load configuration: ${error.message}`);
  }
}

/**
 * Save configuration to YAML file
 * @param {string} configPath - Path to save config
 * @param {object} config - Configuration object
 */
export async function saveConfig(configPath, config) {
  try {
    const yamlStr = yaml.dump(config);
    await fsPromises.writeFile(configPath, yamlStr, 'utf8');
  } catch (error) {
    throw new Error(`Failed to save configuration: ${error.message}`);
  }
}

/**
 * Copy directory recursively
 * @param {string} src - Source directory
 * @param {string} dest - Destination directory
 */
export async function copyDir(src, dest) {
  try {
    const entries = await fsPromises.readdir(src, { withFileTypes: true });
    await fsPromises.mkdir(dest, { recursive: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else {
        await fsPromises.copyFile(srcPath, destPath);
      }
    }
  } catch (error) {
    throw new Error(`Failed to copy directory: ${error.message}`);
  }
}

/**
 * Get template path for framework
 * @param {string} framework - Framework name
 * @returns {string} - Template path
 */
export function getTemplatePath(framework) {
  return path.join(process.cwd(), 'templates', framework);
}
