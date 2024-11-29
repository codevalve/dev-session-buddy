import { exec } from 'child_process';
import { promisify } from 'util';
import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Get the version of a CLI tool
 * @param {string} command - Command to get version
 * @returns {Promise<string>} Version string
 */
export async function getToolVersion(command) {
  try {
    if (command === 'node --version') {
      return process.version;
    }
    const { stdout } = await execAsync(command);
    return stdout.trim();
  } catch (error) {
    return null;
  }
}

/**
 * Copy a directory recursively
 * @param {string} src - Source directory
 * @param {string} dest - Destination directory
 */
export async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
      // Preserve executable permissions
      const stats = await fs.stat(srcPath);
      await fs.chmod(destPath, stats.mode);
    }
  }
}

/**
 * Get template directory path
 * @param {string} framework - Framework name
 * @returns {string} Template directory path
 */
export function getTemplatePath(framework) {
  return join(__dirname, 'templates', framework);
}

/**
 * Check if a command exists in PATH
 * @param {string} command - Command to check
 * @returns {Promise<boolean>} Whether command exists
 */
export async function commandExists(command) {
  try {
    if (command === 'node') {
      return process.execPath !== undefined;
    }
    await execAsync(`command -v ${command}`);
    return true;
  } catch {
    return false;
  }
}

/**
 * Parse version string to components
 * @param {string} version - Version string (e.g., "v14.17.0" or "14.17.0")
 * @returns {number[]} Version components
 */
export function parseVersion(version) {
  const match = version.match(/\d+\.\d+\.\d+/);
  if (!match) return [0, 0, 0];
  return match[0].split('.').map(Number);
}

/**
 * Check if version meets minimum requirement
 * @param {string} current - Current version
 * @param {string} required - Required version
 * @returns {boolean} Whether version is sufficient
 */
export function checkVersion(current, required) {
  const currentParts = parseVersion(current);
  const requiredParts = parseVersion(required.replace(/[^\d.]/g, ''));
  
  for (let i = 0; i < 3; i++) {
    if (currentParts[i] > requiredParts[i]) return true;
    if (currentParts[i] < requiredParts[i]) return false;
  }
  return true;
}

/**
 * Get project root directory
 * @returns {string} Project root directory
 */
export function getProjectRoot() {
  return join(__dirname, '..');
}

/**
 * Load and parse YAML configuration
 * @param {string} path - Path to YAML file
 * @returns {Promise<object>} Configuration object
 */
export async function loadConfig(path) {
  try {
    const yamlContent = await fs.readFile(path, 'utf8');
    // Note: We're using the yaml package which was added to package.json
    const yaml = (await import('yaml')).default;
    return yaml.parse(yamlContent);
  } catch (error) {
    throw new Error(`Failed to load configuration: ${error.message}`);
  }
}

/**
 * Save configuration to YAML file
 * @param {string} path - Path to YAML file
 * @param {object} config - Configuration object
 */
export async function saveConfig(path, config) {
  try {
    const yaml = (await import('yaml')).default;
    await fs.writeFile(path, yaml.stringify(config));
  } catch (error) {
    throw new Error(`Failed to save configuration: ${error.message}`);
  }
}
