import Groq from 'groq-sdk';

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
});

export async function generateWithGroq(
  prompt: string,
  maxTokens: number = 1024
): Promise<string> {
  try {
    if (!process.env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY environment variable is not set');
    }

    const message = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: maxTokens,
      temperature: 0.7,
    });

    const response = message.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from Groq API');
    }

    return response;
  } catch (error: any) {
    console.error('Groq API Error:', error);
    throw new Error(`Groq API Error: ${error.message || 'Unknown error'}`);
  }
}
