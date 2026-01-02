import * as dotenv from 'dotenv';
import https from 'https';

dotenv.config();

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

function makeRequest(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    }).on('error', reject);
  });
}

async function testAPI() {
  console.log('=== Testing Gemini API Directly ===\n');
  
  // Test 1: List models using v1 API
  console.log('1. Testing v1 API - List Models:');
  const v1Url = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;
  try {
    const v1Result = await makeRequest(v1Url);
    console.log('✅ v1 API Response:', JSON.stringify(v1Result, null, 2).substring(0, 500));
  } catch (error: any) {
    console.log('❌ v1 API Error:', error.message);
  }
  
  console.log('\n2. Testing v1beta API - List Models:');
  const v1betaUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  try {
    const v1betaResult = await makeRequest(v1betaUrl);
    console.log('✅ v1beta API Response:', JSON.stringify(v1betaResult, null, 2).substring(0, 1000));
  } catch (error: any) {
    console.log('❌ v1beta API Error:', error.message);
  }
}

testAPI();
