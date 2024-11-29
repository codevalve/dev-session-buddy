#!/usr/bin/env node
import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { TemplateManager } from '../src/template-manager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const program = new Command();

program
  .version('0.1.0')
  .description('Create a new project with Dev Session Buddy')
  .argument('[name]', 'Project name')
  .option('-f, --framework <framework>', 'Framework to use (minimal, vue)')
  .option('-p, --preset <preset>', 'Configuration preset (minimal, full, team)')
  .action(async (name, options) => {
    try {
      // If no name provided, prompt for it
      if (!name) {
        const answers = await inquirer.prompt([
          {
            type: 'input',
            name: 'projectName',
            message: 'What is your project name?',
            validate: input => input.length > 0 || 'Project name is required'
          }
        ]);
        name = answers.projectName;
      }
      
      // Create project directory
      const projectDir = join(process.cwd(), name);
      const spinner = ora('Creating new project...').start();
      
      try {
        const framework = options.framework || 'minimal';
        const preset = options.preset || 'full';
        
        const templateManager = new TemplateManager();
        await templateManager.applyTemplate(projectDir, framework, preset);
        
        spinner.succeed('Project created successfully!');
        
        console.log('\nNext steps:');
        console.log(`1. cd ${name}`);
        console.log('2. npm install');
        console.log('3. npm start');
      } catch (error) {
        spinner.fail('Project creation failed');
        console.error(chalk.red(error.message));
        process.exit(1);
      }
    } catch (error) {
      console.error(chalk.red(error.message));
      process.exit(1);
    }
  });

program.parse(process.argv);
