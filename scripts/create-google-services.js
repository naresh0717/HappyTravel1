const fs = require('fs');
const path = require('path');

// Create the android/app directory if it doesn't exist
const androidAppDir = path.join(__dirname, '../android/app');
if (!fs.existsSync(androidAppDir)) {
  fs.mkdirSync(androidAppDir, { recursive: true });
}

// Create google-services.json from environment variable
if (process.env.GOOGLE_SERVICES_JSON) {
  const googleServicesPath = path.join(androidAppDir, 'google-services.json');
  const googleServicesContent = Buffer.from(process.env.GOOGLE_SERVICES_JSON, 'base64').toString('utf8');
  fs.writeFileSync(googleServicesPath, googleServicesContent);
  console.log('✅ google-services.json created successfully');
} else {
  console.log('❌ GOOGLE_SERVICES_JSON environment variable not found');
}
