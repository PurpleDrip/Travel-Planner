import * as dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

console.log('=== API Key Diagnostics ===\n');
console.log('1. API Key exists:', !!apiKey);
console.log('2. API Key length:', apiKey?.length || 0);
console.log('3. API Key prefix:', apiKey?.substring(0, 15) + '...');
console.log('4. Expected length: ~39 characters for AI Studio keys');
console.log('\n=== Key Type Detection ===');

if (apiKey) {
  if (apiKey.startsWith('AIza')) {
    console.log('✅ This appears to be a Google AI Studio API key');
    console.log('   Endpoint: generativelanguage.googleapis.com');
  } else {
    console.log('⚠️  This does not look like a standard AI Studio key');
    console.log('   AI Studio keys typically start with "AIza"');
  }
} else {
  console.log('❌ No API key found in environment variables');
  console.log('   Please check your .env file has: GOOGLE_GEMINI_API_KEY=your_key_here');
}

console.log('\n=== Next Steps ===');
console.log('1. Verify your API key is from: https://aistudio.google.com/app/apikey');
console.log('2. Make sure the key has Gemini API access enabled');
console.log('3. Check if there are any billing or quota restrictions');
