// app/components/App.tsx
'use client';

import React, { useState } from 'react';
import {
  TransportState,
  VoiceError,
  VoiceEvent,
} from 'realtime-ai';
import { useVoiceClient, useVoiceClientEvent } from 'realtime-ai-react';

const App: React.FC = () => {
  const voiceClient = useVoiceClient();
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<TransportState>('idle');
  const [userTranscripts, setUserTranscripts] = useState<string[]>([]);
  const [botTranscripts, setBotTranscripts] = useState<string[]>([]);

  useVoiceClientEvent(VoiceEvent.TransportStateChanged, (newState: TransportState) => {
    console.log('Transport state changed:', newState);
    setState(newState);
  });

  useVoiceClientEvent(VoiceEvent.UserTranscript, (transcript: string) => {
    console.log('User transcript:', transcript);
    setUserTranscripts((prev) => [...prev, transcript]);
  });

  useVoiceClientEvent(VoiceEvent.BotTranscript, (transcript: string) => {
    console.log('Bot transcript:', transcript);
    setBotTranscripts((prev) => [...prev, transcript]);
  });

  async function start() {
    if (!voiceClient) return;

    try {
      // Explicitly request microphone access
      await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('Microphone access granted.');

      await voiceClient.start();
      console.log('Voice client started.');
    } catch (e) {
      setError((e as Error).message || 'Unknown error occurred');
      console.error('Error starting voice client:', e);
      voiceClient.disconnect();
    }
  }

  async function disconnect() {
    if (!voiceClient) return;

    try {
      await voiceClient.disconnect();
      console.log('Voice client disconnected.');
      setUserTranscripts([]);
      setBotTranscripts([]);
      setError(null);
    } catch (e) {
      setError('Failed to disconnect properly.');
      console.error('Error disconnecting voice client:', e);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {error && <div className="text-red-500 font-bold">Error: {error}</div>}
      <button
        onClick={() => (state === 'idle' ? start() : disconnect())}
        className={`mx-auto px-5 py-2 rounded-full self-center transition-colors ${
          state === 'idle'
            ? 'bg-blue-500 hover:bg-blue-600 text-white'
            : 'bg-red-500 hover:bg-red-600 text-white'
        }`}
        disabled={!voiceClient}
      >
        {state === 'idle' ? 'Start' : 'Disconnect'}
      </button>
      <div className="text-center">
        Transport state: <strong>{state}</strong>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Live Transcription</h2>
        <div className="mt-2">
          <h3 className="font-semibold">You:</h3>
          {userTranscripts.map((transcript, index) => (
            <p key={`user-${index}`} className="mb-1">
              {transcript}
            </p>
          ))}
        </div>
        <div className="mt-2">
          <h3 className="font-semibold">Bot:</h3>
          {botTranscripts.map((transcript, index) => (
            <p key={`bot-${index}`} className="mb-1">
              {transcript}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
