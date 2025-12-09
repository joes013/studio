import {NextRequest, NextResponse} from 'next/server';
import MistralClient from '@mistralai/mistralai';

const apiKey = process.env.MISTRAL_API_KEY;

if (!apiKey) {
  throw new Error('MISTRAL_API_KEY is not defined in environment variables');
}

const client = new MistralClient(apiKey);

export async function POST(req: NextRequest) {
  try {
    const {message} = await req.json();

    if (!message) {
      return NextResponse.json(
        {error: 'Message is required'},
        {status: 400}
      );
    }

    const chatResponse = await client.chat({
      model: 'mistral-small-latest',
      messages: [{role: 'user', content: message}],
    });

    if (
      chatResponse.choices &&
      chatResponse.choices.length > 0 &&
      chatResponse.choices[0].message
    ) {
      return NextResponse.json({
        reply: chatResponse.choices[0].message.content,
      });
    } else {
      return NextResponse.json(
        {error: 'No response from AI'},
        {status: 500}
      );
    }
  } catch (error) {
    console.error('Mistral API error:', error);
    return NextResponse.json({error: 'Failed to fetch AI response'}, {status: 500});
  }
}
