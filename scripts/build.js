#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { promises as fs } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

async function build() {
  console.log('Building Dev Session Buddy...');
  
  // Ensure bin directory exists
  await fs.mkdir(join(projectRoot, 'bin'), { recursive: true });
  
  // Create CLI entry points
  const cliContent = `import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { TemplateManager } from '../src/template-manager.js';
import { commandExists, getToolVersion, checkVersion } from '../src/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const program = new Command();

program
  .version('${process.env.npm_package_version || '0.1.0'}')
  .description('Dev Session Buddy - Your AI-Powered Development Companion');

program
  .command('doctor')
  .description('Check development environment setup')
  .action(async () => {
    const spinner = ora('Checking environment').start();
    
    try {
      const checks = [
        {
          name: 'Node.js',
          version: process.version,
          required: '>=16.0.0',
          command: 'node',
          versionCommand: 'node --version'
        },
        {
          name: 'npm',
          required: '>=8.0.0',
          command: 'npm',
          versionCommand: 'npm --version'
        },
        {
          name: 'Git',
          required: '>=2.0.0',
          command: 'git',
          versionCommand: 'git --version'
        },
        {
          name: 'yq',
          required: '>=4.0.0',
          command: 'yq',
          versionCommand: 'yq --version'
        }
      ];

      const results = [];

      for (const check of checks) {
        const exists = await commandExists(check.command);
        if (!exists) {
          results.push({
            name: check.name,
            status: 'missing',
            message: \`\${check.name} is not installed\`
          });
          continue;
        }

        const version = check.version || await getToolVersion(check.versionCommand);
        if (!version) {
          results.push({
            name: check.name,
            status: 'error',
            message: \`Could not determine \${check.name} version\`
          });
          continue;
        }

        const isValid = checkVersion(version, check.required);
        results.push({
          name: check.name,
          status: isValid ? 'ok' : 'outdated',
          version,
          required: check.required,
          message: isValid ? null : \`\${check.name} version \${version} does not meet requirement \${check.required}\`
        });
      }

      spinner.succeed('Environment check complete');
      
      // Display results
      console.log('');
      for (const result of results) {
        const icon = {
          ok: chalk.green('✓'),
          outdated: chalk.yellow('!'),
          missing: chalk.red('✗'),
          error: chalk.red('✗')
        }[result.status];

        const version = result.version ? \`: \${result.version}\` : '';
        console.log(\`\${icon} \${result.name}\${version}\`);
        
        if (result.message) {
          console.log(\`  \${chalk.dim(result.message)}\`);
        }
      }

      // Exit with error if any checks failed
      const hasErrors = results.some(r => ['missing', 'error', 'outdated'].includes(r.status));
      if (hasErrors) {
        process.exit(1);
      }
    } catch (error) {
      spinner.fail('Environment check failed');
      console.error(chalk.red(error.message));
      process.exit(1);
    }
  });

program
  .command('init')
  .description('Initialize Dev Session Buddy in an existing project')
  .option('-f, --framework <framework>', 'Framework to use (minimal, vue)')
  .option('-p, --preset <preset>', 'Configuration preset (minimal, full, team)')
  .action(async (options) => {
    const spinner = ora('Initializing Dev Session Buddy').start();
    
    try {
      const framework = options.framework || 'minimal';
      const preset = options.preset || 'full';
      
      const templateManager = new TemplateManager();
      await templateManager.applyTemplate(process.cwd(), framework, preset);
      
      spinner.succeed('Dev Session Buddy initialized successfully!');
      
      console.log('\\nNext steps:');
      console.log('1. Review the configuration in dev-session-buddy.yaml');
      console.log('2. Run ./session-start.sh to begin your development session');
    } catch (error) {
      spinner.fail('Initialization failed');
      console.error(chalk.red(error.message));
      process.exit(1);
    }
  });

program.parse(process.argv);
`;

  const createCliContent = `import { Command } from 'commander';
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
  .version('${process.env.npm_package_version || '0.1.0'}')
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
        
        console.log('\\nNext steps:');
        console.log(\`1. cd \${name}\`);
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
`;

  // Generate CLI files
  const mainCli = `#!/usr/bin/env node
${cliContent}`;

  const createCli = `#!/usr/bin/env node
${createCliContent}`;

  // Write CLI files
  await fs.writeFile(join(projectRoot, 'bin', 'dev-session-buddy.js'), mainCli);
  await fs.writeFile(join(projectRoot, 'bin', 'create-dev-session-buddy.js'), createCli);

  // Make CLI files executable
  await fs.chmod(join(projectRoot, 'bin', 'dev-session-buddy.js'), '755');
  await fs.chmod(join(projectRoot, 'bin', 'create-dev-session-buddy.js'), '755');
  
  console.log('Build completed successfully!');
}

build().catch(console.error);
