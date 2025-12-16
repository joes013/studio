import { NextRequest, NextResponse } from 'next/server';

const MistralClient = require('@mistralai/mistralai');

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }
    
    const apiKey = process.env.MISTRAL_API_KEY;
    
    if (!apiKey) {
      throw new Error('MISTRAL_API_KEY is not configured on the server.');
    }

    const client = new MistralClient(apiKey);

    const chatResponse = await client.chat({
      model: 'mistral-small-latest',
      messages: [{ role: 'user', content: message }],
    });

    const responseContent = chatResponse.choices[0].message.content;
    
    return NextResponse.json({ response: responseContent });

  } catch (error: any) {
    console.error('Mistral API error:', error);
    return NextResponse.json({ error: error.message || 'Failed to get response from Mistral AI' }, { status: 500 });
  }
}
