import MistralClient from '@mistralai/mistralai';
import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.MISTRAL_API_KEY;

if (!apiKey) {
  console.error('MISTRAL_API_KEY is not defined in environment variables');
  return NextResponse.json(
    { error: 'MISTRAL_API_KEY is not configured on the server.' },
    { status: 500 }
  );
}

const client = new MistralClient(apiKey);

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const chatResponse = await client.chat({
      model: 'mistral-small-latest',
      messages: [{ role: 'user', content: message }],
    });

    const responseContent = chatResponse.choices[0].message.content;
    
    return NextResponse.json({ response: responseContent });

  } catch (error) {
    console.error('Mistral API error:', error);
    return NextResponse.json({ error: 'Failed to get response from Mistral AI' }, { status: 500 });
  }
}
