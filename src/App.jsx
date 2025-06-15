import React, { useState, useEffect } from 'react';
import PromptForm from './components/PromptForm.jsx';
import OutputDisplay from './components/OutputDisplay.jsx';
import ShareButtons from './components/ShareButtons.jsx';
import { buildPrompt } from './utils/promptBuilder.js';
import { savePromptToStorage, loadPromptFromStorage, clearStorage } from './utils/storageUtils.js';

function App() {
  const [inputs, setInputs] = useState({
    title: '',
    cameraMovement: 'Static',
    videoStyle: 'Cinematic',
    characterDesc: '',
    voiceDetail: '',
    characterAction: '',
    facialExpression: '',
    setting: '',
    atmosphere: '',
    ambientSound: '',
    dialogue: '',
    visualDetail: '',
    negativePrompt: '',
  });

  const [result, setResult] = useState({ id: '', en: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load saved prompt on mount
  useEffect(() => {
    const saved = loadPromptFromStorage();
    if (saved) {
      setInputs(saved.inputs);
      setResult(saved.result);
    }
  }, []);

  const handleChange = (field) => (e) => {
    setInputs((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const userCombinedPrompt = buildPrompt(inputs);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + import.meta.env.VITE_OPENAI_API_KEY,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content:
                'Kamu adalah penulis skenario video kreatif. Buatkan prompt untuk generator video AI dari input berikut. Tulis dalam dua versi:\n\n## Prompt Bahasa Indonesia:\n\n<hasil>\n\n## Prompt Bahasa Inggris:\n\n<hasil>',
            },
            {
              role: 'user',
              content: userCombinedPrompt,
            },
          ],
          temperature: 0.9,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const text = data.choices?.[0]?.message?.content || '';

      // Split into Indonesian and English prompts by headings
      const idMatch = text.match(/## Prompt Bahasa Indonesia:([\s\S]*?)##/i);
      const enMatch = text.match(/## Prompt Bahasa Inggris:([\s\S]*)/i);

      setResult({
        id: idMatch ? idMatch[1].trim() : text,
        en: enMatch ? enMatch[1].trim() : '',
      });

      savePromptToStorage({ inputs, result: { id: idMatch?.[1]?.trim() || text, en: enMatch?.[1]?.trim() || '' } });
    } catch (err) {
      console.error(err);
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setInputs({
      title: '',
      cameraMovement: 'Static',
      videoStyle: 'Cinematic',
      characterDesc: '',
      voiceDetail: '',
      characterAction: '',
      facialExpression: '',
      setting: '',
      atmosphere: '',
      ambientSound: '',
      dialogue: '',
      visualDetail: '',
      negativePrompt: '',
    });
    setResult({ id: '', en: '' });
    clearStorage();
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="p-4 shadow-sm bg-white">
        <h1 className="text-2xl font-semibold text-primary">AI Prompt Karakter</h1>
      </header>

      <main className="flex-1 container mx-auto p-4 max-w-4xl">
        <PromptForm inputs={inputs} onChange={handleChange} onSubmit={handleSubmit} loading={loading} onReset={handleReset} />

        {error && <p className="text-red-600 mt-4">{error}</p>}
        <OutputDisplay result={result} />
        {result.id && <ShareButtons promptId={result.id} promptEn={result.en} />}
      </main>

      <footer className="p-4 bg-gray-100 text-center text-sm text-gray-500">
        © Digital Kreatif — <a className="text-primary hover:underline" href="https://digitalkreatif.id" target="_blank" rel="noopener noreferrer">https://digitalkreatif.id</a>
      </footer>
    </div>
  );
}

export default App; 