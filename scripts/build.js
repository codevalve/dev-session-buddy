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
  const dsbCli = `#!/usr/bin/env node
import { Command } from 'commander';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const program = new Command();

program
  .version('${process.env.npm_package_version || '0.1.0'}')
  .description('Dev Session Buddy - Your AI-Powered Development Companion');

// TODO: Add commands

program.parse(process.argv);
`;

  const createDsbCli = `#!/usr/bin/env node
import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const program = new Command();

program
  .version('${process.env.npm_package_version || '0.1.0'}')
  .description('Create a new project with Dev Session Buddy')
  .argument('[name]', 'Project name')
  .option('-f, --framework <framework>', 'Framework template to use')
  .option('-p, --preset <preset>', 'Configuration preset (full, minimal, or team)')
  .action(async (name, options) => {
    // TODO: Implement project creation
    console.log(chalk.green('Creating new project...'));
  });

program.parse(process.argv);
`;

  // Write CLI files
  await fs.writeFile(join(projectRoot, 'bin', 'dsb.js'), dsbCli);
  await fs.writeFile(join(projectRoot, 'bin', 'create-dev-session-buddy.js'), createDsbCli);
  
  // Make CLI files executable
  await fs.chmod(join(projectRoot, 'bin', 'dsb.js'), '755');
  await fs.chmod(join(projectRoot, 'bin', 'create-dev-session-buddy.js'), '755');
  
  console.log('Build completed successfully!');
}

build().catch(console.error);
