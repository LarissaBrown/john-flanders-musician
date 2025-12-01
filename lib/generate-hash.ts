// Utility to generate password hash for admin account
// Run with: npx tsx lib/generate-hash.ts

import bcrypt from 'bcryptjs';

async function generateHash() {
  const password = process.argv[2] || 'admin123';
  const hash = await bcrypt.hash(password, 10);
  
  console.log('\n🔐 Admin Password Hash Generated!\n');
  console.log('Password:', password);
  console.log('Hash:', hash);
  console.log('\n📝 Add this to your .env.local file:');
  console.log(`ADMIN_PASSWORD_HASH="${hash}"`);
  console.log('\n⚠️  Remember to change the default password!\n');
}

generateHash();

