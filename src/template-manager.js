import { promises as fs } from 'fs';
import path from 'path';
import * as utils from './utils.js';

export class TemplateManager {
  /**
   * Create a new project from a template
   * @param {string} projectDir - Project directory
   * @param {string} framework - Framework name
   * @param {string} preset - Preset name
   */
  async applyTemplate(projectDir, framework, preset) {
    try {
      // Create project directory first
      await fs.mkdir(projectDir, { recursive: true });

      // Get template directory
      const templateDir = utils.getTemplatePath(framework);

      // Create project structure
      await this._createProjectStructure(projectDir);

      // Copy template files
      await this._copyTemplateFiles(templateDir, projectDir);

      // Setup configuration
      await this._setupConfiguration(projectDir, framework, preset);

      // Framework-specific setup
      await this._frameworkSetup(projectDir, framework);
    } catch (error) {
      throw new Error(`Failed to apply template: ${error.message}`);
    }
  }

  /**
   * Create project directory structure
   * @param {string} projectDir - Project directory
   * @private
   */
  async _createProjectStructure(projectDir) {
    const dirs = [
      'src',
      'tests',
      'docs',
      '.dev-session-buddy'
    ];

    for (const dir of dirs) {
      await fs.mkdir(path.join(projectDir, dir), { recursive: true });
    }
  }

  /**
   * Copy template files
   * @param {string} templateDir - Template directory
   * @param {string} projectDir - Project directory
   * @private
   */
  async _copyTemplateFiles(templateDir, projectDir) {
    const config = await utils.loadConfig(path.join(templateDir, 'config-template.yaml'));
    const entries = await fs.readdir(templateDir);

    for (const entry of entries) {
      if (entry === 'config-template.yaml') continue;
      const srcPath = path.join(templateDir, entry);
      const destPath = path.join(projectDir, entry);
      await utils.copyDir(srcPath, destPath);
    }

    return config;
  }

  /**
   * Setup project configuration
   * @param {string} projectDir - Project directory
   * @param {string} framework - Framework name
   * @param {string} preset - Preset name
   * @private
   */
  async _setupConfiguration(projectDir, framework, preset) {
    const templateDir = utils.getTemplatePath(framework);
    const config = await utils.loadConfig(path.join(templateDir, 'config-template.yaml'));

    const projectConfig = {
      ...config,
      framework,
      preset,
      createdAt: new Date().toISOString()
    };

    await utils.saveConfig(
      path.join(projectDir, 'dev-session-buddy.yaml'),
      projectConfig
    );
  }

  /**
   * Framework-specific setup
   * @param {string} projectDir - Project directory
   * @param {string} framework - Framework name
   * @private
   */
  async _frameworkSetup(projectDir, framework) {
    const templateDir = utils.getTemplatePath(framework);
    const config = await utils.loadConfig(path.join(templateDir, 'config-template.yaml'));

    // Create framework-specific directories
    if (config.directories && Array.isArray(config.directories)) {
      for (const dir of config.directories) {
        await fs.mkdir(path.join(projectDir, 'src', dir), { recursive: true });
      }
    }
  }
}
