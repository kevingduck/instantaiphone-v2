// app/config/botConfig.ts
export const botConfig = [
  {
    service: 'vad',
    options: [
      {
        name: 'params',
        value: {
          stop_secs: 0.3,
        },
      },
    ],
  },
  {
    service: 'tts',
    options: [
      {
        name: 'voice',
        value: '156fb8d2-335b-4950-9cb3-a2d33befec77',
      },
      {
        name: 'model',
        value: 'sonic-english',
      },
      {
        name: 'language',
        value: 'en',
      },
    ],
  },
  {
    service: 'llm',
    options: [
      {
        name: 'model',
        value: 'claude-3-5-sonnet-20240620',
      },
      {
        name: 'initial_messages',
        value: [
          {
            role: 'user',
            content: [
              {
                text: 'You are a customer service rep for Meadows Pool & Spa. YOU MUST RESPOND IN 1-2 SENTENCES. ...',
                type: 'text',
              },
            ],
          },
        ],
      },
      {
        name: 'run_on_config',
        value: true,
      },
    ],
  },
  {
    service: 'deepgram', // Ensure service name matches
    options: [
      {
        name: 'model',
        value: 'nova-2-conversationalai',
      },
      {
        name: 'language',
        value: 'en',
      },
    ],
  },
];
