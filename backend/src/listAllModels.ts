import * as dotenv from 'dotenv';
import * as fs from 'fs';
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

async function listAllModels() {
  console.log('Fetching available models...\n');
  
  const v1betaUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  
  try {
    const result = await makeRequest(v1betaUrl);
    
    // Save full response
    fs.writeFileSync('models-response.json', JSON.stringify(result, null, 2));
    console.log('✅ Full response saved to models-response.json\n');
    
    if (result.models && Array.isArray(result.models)) {
      console.log(`Found ${result.models.length} models:\n`);
      
      result.models.forEach((model: any) => {
        const name = model.name?.replace('models/', '') || 'unknown';
        const methods = model.supportedGenerationMethods || [];
        const supportsGenerate = methods.includes('generateContent');
        
        console.log(`${supportsGenerate ? '✅' : '❌'} ${name}`);
        if (model.displayName) console.log(`   Display: ${model.displayName}`);
        console.log(`   Methods: ${methods.join(', ')}`);
        console.log('');
      });
      
      // Find the best model for text generation
      const textModels = result.models.filter((m: any) => 
        m.supportedGenerationMethods?.includes('generateContent')
      );
      
      if (textModels.length > 0) {
        console.log('\n🎯 RECOMMENDED MODEL FOR YOUR APP:');
        const recommended = textModels[0];
        const modelName = recommended.name?.replace('models/', '');
        console.log(`   Use: "${modelName}"`);
        console.log(`   Display Name: ${recommended.displayName}`);
      }
    }
  } catch (error: any) {
    console.log('❌ Error:', error.message);
  }
}

listAllModels();
