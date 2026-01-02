import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

async function testGenerateContent() {
  console.log('Testing gemini-2.5-flash model...\n');
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = "Say 'Hello! I am working correctly!' in a friendly way.";
    
    console.log('Sending request to Gemini API...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('\n✅ SUCCESS! Model is working!\n');
    console.log('Response:', text);
    console.log('\n🎉 Your Gemini API is configured correctly!');
    
  } catch (error: any) {
    console.log('\n❌ ERROR:', error.message);
    console.log('\nFull error:', error);
  }
}

testGenerateContent();
