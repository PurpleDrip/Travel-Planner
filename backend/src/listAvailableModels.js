const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

async function listModels() {
  try {
    console.log('Fetching available models...\n');
    
    // Try to list models
    const models = await genAI.listModels();
    
    console.log('Available models:');
    console.log('=================\n');
    
    for await (const model of models) {
      console.log(`Model: ${model.name}`);
      console.log(`Display Name: ${model.displayName}`);
      console.log(`Supported Methods: ${model.supportedGenerationMethods?.join(', ')}`);
      console.log('---');
    }
  } catch (error) {
    console.error('Error listing models:', error.message);
    console.error('\nFull error:', error);
  }
}

listModels();
