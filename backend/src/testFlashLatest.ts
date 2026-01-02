import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

async function testFlashLatest() {
  console.log('Testing gemini-flash-latest model...\n');
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    
    const prompt = "Generate a simple one-day itinerary for Paris in JSON format with this structure: {\"title\": \"Trip Title\", \"days\": [{\"day\": 1, \"date\": \"2025-01-01\", \"activities\": [{\"time\": \"09:00 AM\", \"activity\": \"Visit Eiffel Tower\", \"description\": \"See the iconic landmark\", \"location\": {\"lat\": 48.8584, \"lng\": 2.2945, \"name\": \"Eiffel Tower\"}}]}]}";
    
    console.log('Sending request...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('\n✅ SUCCESS!\n');
    console.log('Response preview:', text.substring(0, 200) + '...');
    
    // Try to parse as JSON
    const cleaned = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    const parsed = JSON.parse(cleaned);
    console.log('\n✅ JSON parsing successful!');
    console.log('Title:', parsed.title);
    console.log('Days:', parsed.days?.length);
    
  } catch (error: any) {
    console.log('\n❌ ERROR:', error.message);
    if (error.status) {
      console.log('Status:', error.status);
      console.log('Status Text:', error.statusText);
    }
  }
}

testFlashLatest();
