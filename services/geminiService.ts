
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartResponse = async (comment: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a polite, professional, and helpful response to this customer review: "${comment}"`,
      config: {
        maxOutputTokens: 150,
      }
    });
    return response.text || "Thank you for your feedback!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Thank you for your valuable feedback. We're glad you liked it!";
  }
};

export const getAnalyticsInsight = async (data: any): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze these sales numbers and provide one actionable tip for a seller: ${JSON.stringify(data)}`,
      config: {
        maxOutputTokens: 100,
      }
    });
    return response.text || "Your conversion rate is steady. Consider a promotional event.";
  } catch (error) {
    return "Consistently track your high-performing products to optimize stock levels.";
  }
};

// Added missing export for collaboration pitch generation using Gemini 3 Flash
export const generateCollabPitch = async (creatorName: string, niche: string, product: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Draft a short, compelling collaboration pitch for an influencer named ${creatorName} who specializes in ${niche}. We want them to promote ${product}. Keep it professional yet exciting.`,
      config: {
        maxOutputTokens: 250,
      }
    });
    return response.text || "Hi! We love your content and would love to collaborate with you on our new collection.";
  } catch (error) {
    console.error("Gemini Pitch Error:", error);
    return "Hello! We are impressed by your profile and would like to discuss a potential partnership regarding our latest products.";
  }
};
