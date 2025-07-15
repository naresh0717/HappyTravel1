#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log(' Setting up google-services.json...');

try {
  // Check if environment variable exists
  if (!process.env.GOOGLE_SERVICES_JSON) {
    console.log('❌ GOOGLE_SERVICES_JSON environment variable not found');
    process.exit(1);
  }

  // Create android directory structure
  const androidDir = path.join(process.cwd(), 'android');
  const appDir = path.join(androidDir, 'app');
  
  if (!fs.existsSync(androidDir)) {
    fs.mkdirSync(androidDir, { recursive: true });
  }
  
  if (!fs.existsSync(appDir)) {
    fs.mkdirSync(appDir, { recursive: true });
  }

  // Decode and write the file
  const googleServicesPath = path.join(appDir, 'google-services.json');
  const googleServicesContent = Buffer.from(process.env.GOOGLE_SERVICES_JSON, 'base64').toString('utf8');
  
  // Validate JSON before writing
  JSON.parse(googleServicesContent);
  
  fs.writeFileSync(googleServicesPath, googleServicesContent);
  console.log('✅ google-services.json created successfully at:', googleServicesPath);
  
} catch (error) {
  console.error('❌ Error creating google-services.json:', error.message);
  process.exit(1);
}
