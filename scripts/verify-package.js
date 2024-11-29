#!/usr/bin/env node

import { TemplateManager, getToolVersion } from '../src/index.js';

async function verifyPackage() {
  console.log('Verifying package functionality...');
  
  // Test importing and instantiating TemplateManager
  const templateManager = new TemplateManager();
  console.log('✓ Successfully imported and instantiated TemplateManager');
  
  // Test utility function
  const nodeVersion = await getToolVersion('node --version');
  console.log(`✓ Successfully retrieved Node.js version: ${nodeVersion}`);
  
  console.log('\nPackage verification complete! 🎉');
}

verifyPackage().catch(console.error);
