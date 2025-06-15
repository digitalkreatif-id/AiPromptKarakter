import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true,
});

export interface PromptInput {
  judulScene: string;
  pergerakanKamera: string;
  gayaVideo: string;
  deskripsiKarakter: string;
  detailSuaraKarakter: string;
  aksiKarakter: string;
  ekspresiKarakter: string;
  latarTempatWaktu: string;
  suasanaKeseluruhan: string;
  suaraLingkungan: string;
  dialogKarakter: string;
  detailVisualTambahan: string;
  negativePrompt: string;
}

export async function generatePrompts(input: PromptInput) {
  const systemMessage = `You are a professional video director and prompt engineer. Create two prompts based on the inputs provided:\n1. Bahasa Indonesia (detailed)\n2. English (detailed)\nPisahkan kedua prompt dengan satu baris kosong.`;

  const userMessage = Object.entries(input)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    temperature: 0.7,
    messages: [
      { role: 'system', content: systemMessage },
      { role: 'user', content: userMessage },
    ],
  });

  const content = completion.choices[0].message.content || '';
  const [indonesia, english] = content.split(/\n\n+/);

  return {
    indonesia: indonesia?.trim() ?? '',
    english: english?.trim() ?? '',
  };
} 