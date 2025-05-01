
// API key handling for Gemini AI
import { toast } from "sonner";

// NOTE: In a production environment, you should use environment variables 
// or Supabase Edge Functions to store API keys
let apiKey: string | null = localStorage.getItem('gemini-api-key');

export const setApiKey = (key: string) => {
  apiKey = key;
  localStorage.setItem('gemini-api-key', key);
};

export const getApiKey = () => apiKey;

export const hasApiKey = () => Boolean(apiKey);

type GeminiMessage = {
  role: 'user' | 'model';
  parts: { text: string }[];
};

export const generateTravelResponse = async (
  prompt: string, 
  selectedDestination?: string
): Promise<string> => {
  try {
    if (!apiKey) {
      return "Please set your Gemini API key to enable AI responses.";
    }

    const systemPrompt = `You are an expert travel guide AI. Provide helpful, accurate, and engaging information about travel destinations. 
${selectedDestination ? `Focus on information about ${selectedDestination}.` : ''}
Include interesting facts, local tips, best times to visit, and cultural insights. 
Be conversational but concise. Keep responses under 200 words unless asked for more detail.`;
    
    const messages: GeminiMessage[] = [
      {
        role: 'user',
        parts: [{ text: systemPrompt }]
      },
      {
        role: 'user',
        parts: [{ text: prompt }]
      }
    ];

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: messages,
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 800,
        },
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error('Gemini API error:', data.error);
      return `Sorry, I encountered an error: ${data.error.message}`;
    }

    if (!data.candidates || data.candidates.length === 0) {
      return "Sorry, I couldn't generate a response. Please try again.";
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return "Sorry, I encountered an error while connecting to my knowledge base. Please try again later.";
  }
};
