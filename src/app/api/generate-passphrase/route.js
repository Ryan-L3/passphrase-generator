// app/api/generate-passphrase/route.js
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request) {
    try {
        const { theme } = await request.json();

        // Initialize the Gemini API with your API key
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

        // Craft the prompt for Gemini
        const prompt = `Generate exactly 4 random words related to the theme "${theme}" that would make a good passphrase. 
    The words should be common enough to remember but not too predictable. 
    Return only the 4 words separated by hyphens, with no additional text, explanations, or punctuation. For example: word1-word2-word3-word4`;

        // Generate content using Gemini
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let passphrase = response.text().trim();

        // Clean the response to ensure we only get 4 hyphen-separated words
        passphrase = passphrase.replace(/[^a-zA-Z0-9\-]/g, '');

        // Check if we have the expected format
        const words = passphrase.split('-');
        if (words.length !== 4) {
            // If the format is not as expected, try to extract 4 words
            const allWords = passphrase.replace(/-/g, ' ').split(/\s+/).filter(word => word.length > 0);
            if (allWords.length >= 4) {
                passphrase = allWords.slice(0, 4).join('-');
            } else {
                throw new Error('Failed to generate a proper passphrase');
            }
        }

        return Response.json({ passphrase });
    } catch (error) {
        console.error('Error in passphrase generation:', error);
        return Response.json(
            { error: 'Failed to generate passphrase' },
            { status: 500 }
        );
    }
}