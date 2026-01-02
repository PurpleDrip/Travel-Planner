import { GoogleGenerativeAI } from "@google/generative-ai";
import { IGeneratedPlan } from '../types';
import { AppError } from '../middleware/errorHandler';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

export const generateItinerary = async (
  destination: string,
  startDate: string,
  endDate: string,
  preferences?: string
): Promise<IGeneratedPlan> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const prompt = `
You are a professional travel planner. Create a detailed, realistic travel itinerary for a trip to ${destination} from ${startDate} to ${endDate} (${days} days).

${preferences ? `User preferences: ${preferences}` : ''}

IMPORTANT: Return ONLY a valid JSON object with NO markdown formatting, NO code blocks, NO backticks.

The JSON structure must be:
{
  "title": "A catchy trip title",
  "days": [
    {
      "day": 1,
      "date": "YYYY-MM-DD",
      "activities": [
        {
          "time": "09:00 AM",
          "activity": "Activity name",
          "description": "Detailed description (2-3 sentences)",
          "location": {
            "lat": <actual latitude>,
            "lng": <actual longitude>,
            "name": "Specific location name"
          }
        }
      ]
    }
  ]
}

Requirements:
1. Include 4-6 activities per day with realistic times
2. Use REAL coordinates for actual locations in ${destination}
3. Include breakfast, lunch, dinner, and attractions
4. Make descriptions engaging and informative
5. Consider travel time between locations
6. Include a mix of popular attractions and hidden gems
7. Respect the user's preferences if provided
8. Ensure activities flow logically throughout the day

Return ONLY the JSON object, nothing else.
    `.trim();

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up the response
    let jsonStr = text.trim();
    
    // Remove markdown code blocks if present
    jsonStr = jsonStr.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    
    // Remove any leading/trailing whitespace
    jsonStr = jsonStr.trim();

    // Parse and validate
    const parsedPlan = JSON.parse(jsonStr) as IGeneratedPlan;

    // Validate structure
    if (!parsedPlan.title || !parsedPlan.days || !Array.isArray(parsedPlan.days)) {
      throw new Error('Invalid itinerary structure returned from AI');
    }

    return parsedPlan;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    if (error instanceof SyntaxError) {
      throw new AppError('Failed to parse AI response. Please try again.', 500);
    }
    
    throw new AppError(
      error.message || 'Failed to generate itinerary. Please try again.',
      500
    );
  }
};
