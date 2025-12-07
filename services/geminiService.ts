import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateJsonlData = async (
  topic: string, 
  count: number = 5
): Promise<string> => {
  try {
    const prompt = `
      Generate ${count} examples of training data for an LLM fine-tuning task.
      The topic is: "${topic}".
      
      Format the output specifically as JSON Lines (JSONL).
      Each line must be a valid JSON object with a single key "text".
      The "text" field should contain the training content.
      
      Do not wrap the output in markdown code blocks.
      Return raw JSONL text.
      
      Example format:
      {"text": "User: Hello. AI: Hi there!"}
      {"text": "User: What is 2+2? AI: It is 4."}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
        topK: 40,
        responseMimeType: "text/plain"
      }
    });

    let text = response.text || "";
    
    // Cleanup if the model accidentally adds markdown
    text = text.replace(/```jsonl/g, '').replace(/```json/g, '').replace(/```/g, '').trim();
    
    return text;
  } catch (error) {
    console.error("Gemini generation error:", error);
    throw new Error("Failed to generate training data.");
  }
};

export const explainConcept = async (concept: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Explain the concept of "${concept}" in the context of LLM training with MLX on Apple Silicon. Keep it brief (under 50 words) and easy to understand for a beginner.`,
        });
        return response.text || "Explanation unavailable.";
    } catch (error) {
        return "Could not fetch explanation.";
    }
}