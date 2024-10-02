// app/api/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { botConfig } from 'app/config/botConfig.ts';

export async function POST(request: NextRequest) {
  const { services, config } = await request.json();

  if (!services || !config || !process.env.DAILY_BOTS_KEY) {
    return NextResponse.json(
      { error: 'Services or config not found in request body' },
      { status: 400 }
    );
  }

  const payload = {
    bot_profile: 'voice_2024_08',
    max_duration: 600,
    services,
    api_keys: {
      anthropic: process.env.ANTHROPIC_API_KEY,
      deepgram: process.env.DEEPGRAM_API_KEY,
      // Add other API keys if necessary
    },
    config,
  };

  try {
    const response = await fetch('https://api.daily.co/v1/bots/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DAILY_BOTS_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
