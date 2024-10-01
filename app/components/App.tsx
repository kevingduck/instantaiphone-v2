// app/components/App.tsx
'use client';

import React, { useState } from 'react';
import { useVoiceClient } from 'realtime-ai-react';

const App: React.FC = () => {
  const voiceClient = useVoiceClient();
  const [error, setError] = useState<string | null>(null);

  async function start() {
    if (!voiceClient) return;

    try {
      await voiceClient.start();
    } catch (e) {
      setError((e as Error).message || 'Unknown error occurred');
      voiceClient.disconnect();
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {error && <div className="text-red-500 font-bold">{error}</div>}
      <button
        onClick={start}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Start
      </button>
    </div>
  );
};

export default App;
