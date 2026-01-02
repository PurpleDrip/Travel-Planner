import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

console.log('API Key exists:', !!apiKey);
console.log('API Key length:', apiKey?.length || 0);
console.log('API Key starts with:', apiKey?.substring(0, 10) + '...\n');

const genAI = new GoogleGenerativeAI(apiKey!);

async function testModels() {
  const modelsToTest = [
    'gemini-pro',
    'gemini-1.5-pro',
    'gemini-1.5-flash',
    'gemini-1.5-flash-latest',
    'gemini-1.5-pro-latest'
  ];

  for (const modelName of modelsToTest) {
    try {
      console.log(`Testing model: ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent('Say hello');
      const response = await result.response;
      const text = response.text();
      console.log(`✅ ${modelName} WORKS! Response: ${text.substring(0, 50)}...\n`);
      break; // Stop at first working model
    } catch (error: any) {
      console.log(`❌ ${modelName} failed: ${error.message}\n`);
    }
  }
}

testModels();
