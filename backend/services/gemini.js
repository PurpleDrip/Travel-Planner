const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

const generateItinerary = async (destination, startDate, endDate, preferences) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
            Create a detailed travel itinerary for a trip to ${destination} from ${startDate} to ${endDate}.
            Preferences: ${preferences}.
            
            Return the response ONLY as a valid JSON object with the following structure:
            {
                "title": "Trip Title",
                "days": [
                    {
                        "day": 1,
                        "date": "YYYY-MM-DD",
                        "activities": [
                            {
                                "time": "09:00 AM",
                                "activity": "Activity Name",
                                "description": "Brief description",
                                "location": { "lat": 0.0, "lng": 0.0, "name": "Location Name" }
                            }
                        ]
                    }
                ]
            }
            Do not include any markdown formatting like \`\`\`json. Just the raw JSON.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Basic cleanup if markdown is still present
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw new Error("Failed to generate itinerary");
    }
};

module.exports = { generateItinerary };
