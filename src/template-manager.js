import { promises as fs } from 'fs';
import { join } from 'path';
import { getTemplatePath, copyDir, loadConfig, saveConfig } from './utils.js';

export class TemplateManager {
  /**
   * Apply a template to a project
   * @param {string} projectDir - Project directory
   * @param {string} framework - Framework name
   * @param {string} preset - Configuration preset
   */
  async applyTemplate(projectDir, framework, preset) {
    const templateDir = getTemplatePath(framework);
    
    try {
      // Copy template files
      await this._copyTemplateFiles(templateDir, projectDir);
      
      // Load and customize configuration
      await this._setupConfiguration(projectDir, framework, preset);
      
      // Framework-specific setup
      await this._frameworkSetup(projectDir, framework);
    } catch (error) {
      throw new Error(`Failed to apply template: ${error.message}`);
    }
  }

  /**
   * Copy template files to project
   * @private
   */
  async _copyTemplateFiles(templateDir, projectDir) {
    // Copy template files
    const templateConfig = await loadConfig(join(templateDir, 'config-template.yaml'));
    
    // Create necessary directories
    const dirs = [
      'src',
      'tests',
      'docs',
      '.dev-session-buddy',
      ...(templateConfig.directories || [])
    ];

    for (const dir of dirs) {
      await fs.mkdir(join(projectDir, dir), { recursive: true });
    }

    // Copy framework-specific files
    const templateFiles = await fs.readdir(templateDir);
    for (const file of templateFiles) {
      if (file === 'config-template.yaml') continue; // Skip template config
      
      const srcPath = join(templateDir, file);
      const destPath = join(projectDir, file);
      
      const stats = await fs.stat(srcPath);
      if (stats.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
        // Preserve executable permissions
        await fs.chmod(destPath, stats.mode);
      }
    }
  }

  /**
   * Setup project configuration
   * @private
   */
  async _setupConfiguration(projectDir, framework, preset) {
    const templateDir = getTemplatePath(framework);
    const templateConfig = await loadConfig(join(templateDir, 'config-template.yaml'));
    
    // Customize configuration based on preset
    const config = { 
      ...templateConfig,
      testing: templateConfig.testing || {},
      documentation: templateConfig.documentation || {},
      standards: templateConfig.standards || {},
      tools: templateConfig.tools || {}
    };
    config.preset = preset;
    
    if (preset === 'minimal') {
      // Simplify configuration for minimal preset
      delete config.tools.optional;
      config.testing.coverage = 0;
      config.documentation.required = false;
    } else if (preset === 'team') {
      // Add team-specific settings
      config.standards.review = {
        required: true,
        minReviewers: 2
      };
    }

    // Save configuration
    await saveConfig(join(projectDir, 'dev-session-buddy.yaml'), config);
  }

  /**
   * Perform framework-specific setup
   * @private
   */
  async _frameworkSetup(projectDir, framework) {
    if (framework === 'vue') {
      // Vue.js specific setup
      const packageJson = {
        name: projectDir.split('/').pop(),
        version: '0.1.0',
        type: 'module',
        scripts: {
          dev: 'vite',
          build: 'vite build',
          preview: 'vite preview',
          test: 'vitest',
          lint: 'eslint . --ext .vue,.js,.jsx,.cjs,.mjs --fix --ignore-path .gitignore'
        },
        dependencies: {
          vue: '^3.3.0',
          'vue-router': '^4.2.0',
          pinia: '^2.1.0'
        },
        devDependencies: {
          '@vitejs/plugin-vue': '^4.4.0',
          vite: '^4.5.0',
          vitest: '^0.34.0',
          '@vue/test-utils': '^2.4.0',
          eslint: '^8.49.0',
          'eslint-plugin-vue': '^9.17.0'
        }
      };
      
      await fs.writeFile(
        join(projectDir, 'package.json'),
        JSON.stringify(packageJson, null, 2)
      );
    }
  }
}
