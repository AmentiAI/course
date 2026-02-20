import { NextRequest } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text) {
      return new Response('Text is required', { status: 400 });
    }

    // Clean text for speech (remove markdown formatting)
    let cleanText = text
      .replace(/#{1,6}\s/g, '') // Remove headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1') // Remove italic
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
      .replace(/`(.*?)`/g, '$1') // Remove code blocks
      .replace(/^[-*+]\s/gm, '') // Remove list markers
      .replace(/^\d+\.\s/gm, '') // Remove numbered list markers
      .trim();

    // OpenAI TTS has 4096 character limit - truncate intelligently if needed
    const MAX_CHARS = 3800; // Safe margin under 4096
    if (cleanText.length > MAX_CHARS) {
      // Find the last sentence boundary before MAX_CHARS
      const truncated = cleanText.substring(0, MAX_CHARS);
      const lastPeriod = truncated.lastIndexOf('.');
      const lastQuestion = truncated.lastIndexOf('?');
      const lastExclamation = truncated.lastIndexOf('!');
      
      const lastSentenceEnd = Math.max(lastPeriod, lastQuestion, lastExclamation);
      
      if (lastSentenceEnd > 0) {
        cleanText = truncated.substring(0, lastSentenceEnd + 1) + ' The full lesson content continues below.';
      } else {
        // No sentence boundary found, just truncate at word boundary
        const lastSpace = truncated.lastIndexOf(' ');
        cleanText = truncated.substring(0, lastSpace > 0 ? lastSpace : MAX_CHARS) + '... The full lesson content continues below.';
      }
    }

    // Use OpenAI TTS - alloy is a balanced, natural-sounding voice
    const mp3 = await openai.audio.speech.create({
      model: 'tts-1', // or 'tts-1-hd' for higher quality
      voice: 'alloy', // alloy, echo, fable, onyx, nova, shimmer
      input: cleanText,
      speed: 1.0,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    return new Response(buffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': buffer.length.toString(),
      },
    });
  } catch (error: any) {
    console.error('TTS Error:', error);
    
    // Return detailed error for debugging
    return new Response(
      JSON.stringify({
        error: 'Failed to generate audio',
        details: error.message,
        hint: 'Try a shorter text or check OpenAI API key'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
