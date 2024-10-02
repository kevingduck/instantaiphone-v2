// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { DailyVoiceClient } from 'realtime-ai-daily';
import { VoiceClientProvider, VoiceClientAudio } from 'realtime-ai-react';
import App from './components/App';
import { botConfig } from './config/botConfig';

export default function Home() {
  const [dailyVoiceClient, setDailyVoiceClient] = useState<DailyVoiceClient | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    if (dailyVoiceClient) return;

    const voiceClient = new DailyVoiceClient({
      baseUrl: '/api',
      services: {
        llm: 'anthropic',
        tts: 'cartesia',
        stt: 'deepgram',
      },
      config: botConfig,
    });

    console.log('Initialized voiceClient:', voiceClient);
    setDailyVoiceClient(voiceClient);
    setIsInitializing(false);
  }, [dailyVoiceClient]);

  if (isInitializing) {
    return <div>Loading...</div>;
  }

  if (!dailyVoiceClient) {
    return <div>Failed to initialize the voice client.</div>;
  }

  return (
    <VoiceClientProvider voiceClient={dailyVoiceClient}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-4xl font-bold">My First Daily Bot</h1>
          <App />
        </div>
      </main>
      <VoiceClientAudio />
    </VoiceClientProvider>
  );
}
