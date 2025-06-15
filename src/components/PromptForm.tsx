import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { generatePrompts, PromptInput } from '@/lib/openai';
import { Share2, RefreshCcw, Save, Send } from 'lucide-react';

const schema = z.object({
  judulScene: z.string().min(1),
  pergerakanKamera: z.string(),
  gayaVideo: z.string(),
  deskripsiKarakter: z.string(),
  detailSuaraKarakter: z.string(),
  aksiKarakter: z.string(),
  ekspresiKarakter: z.string(),
  latarTempatWaktu: z.string(),
  suasanaKeseluruhan: z.string(),
  suaraLingkungan: z.string(),
  dialogKarakter: z.string(),
  detailVisualTambahan: z.string(),
  negativePrompt: z.string(),
});

type FormValues = z.infer<typeof schema>;

export default function PromptForm() {
  const [resultID, setResultID] = useState('');
  const [resultEN, setResultEN] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      judulScene: '',
      pergerakanKamera: 'static',
      gayaVideo: 'cinematic',
    } as Partial<FormValues> as FormValues,
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const { indonesia, english } = await generatePrompts(data as PromptInput);
      setResultID(indonesia);
      setResultEN(english);
    } catch (err) {
      alert('Gagal menghasilkan prompt. Periksa koneksi internet Anda');
      console.error(err);
    }
  };

  const handleReset = () => {
    reset();
    setResultID('');
    setResultEN('');
  };

  const handleSave = () => {
    const saved = {
      id: Date.now(),
      input: resultID,
      en: resultEN,
    };
    const existing = JSON.parse(localStorage.getItem('ai-prompts') || '[]');
    existing.push(saved);
    localStorage.setItem('ai-prompts', JSON.stringify(existing));
    alert('Prompt disimpan ke localStorage');
  };

  const shareUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent('Cek Prompt Generator oleh Digital Kreatif');

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Judul Scene */}
        <div>
          <label className="mb-1 block font-medium">Judul Scene</label>
          <Input {...register('judulScene')} placeholder="Judul scene" />
        </div>
        {/* Pergerakan Kamera */}
        <div>
          <label className="mb-1 block font-medium">Pergerakan Kamera</label>
          <Select {...register('pergerakanKamera')} >
            {['static','pan','tilt','zoom','dolly','tracking','handheld','drone'].map(v=> <option key={v} value={v}>{v}</option>)}
          </Select>
        </div>
        {/* Gaya Video */}
        <div>
          <label className="mb-1 block font-medium">Gaya Video</label>
          <Select {...register('gayaVideo')} >
            {['cinematic','vlog','dokumenter','animasi','sinetron','iklan','pendek','edukatif'].map(v=> <option key={v} value={v}>{v}</option>)}
          </Select>
        </div>
        {/* Textareas */}
        {([
          ['deskripsiKarakter', 'Deskripsi Karakter'],
          ['detailSuaraKarakter','Detail Suara Karakter'],
          ['aksiKarakter','Aksi Karakter'],
          ['ekspresiKarakter','Ekspresi Karakter'],
          ['latarTempatWaktu','Latar Tempat & Waktu'],
          ['suasanaKeseluruhan','Suasana Keseluruhan'],
          ['suaraLingkungan','Suara Lingkungan'],
          ['dialogKarakter','Dialog Karakter'],
          ['detailVisualTambahan','Detail Visual Tambahan'],
          ['negativePrompt','Negative Prompt'],
        ] as const).map(([field, label]) => (
          <div key={field}>
            <label className="mb-1 block font-medium">{label}</label>
            <Textarea {...register(field)} placeholder={label} />
          </div>
        ))}

        <div className="flex flex-wrap gap-3 pt-2">
          <Button type="submit" disabled={isSubmitting} className="gap-2">
            <Send size={16} />
            Generate Prompt
          </Button>
          <Button type="button" variant="outline" onClick={handleReset} className="gap-2">
            <RefreshCcw size={16} />
            Reset
          </Button>
          <Button type="button" variant="outline" onClick={handleSave} className="gap-2">
            <Save size={16} />
            Simpan
          </Button>
        </div>
      </form>

      {resultID && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold">Prompt (Bahasa Indonesia)</h2>
            <Textarea
              value={resultID}
              onChange={(e) => setResultID(e.currentTarget.value)}
              className="min-h-[160px]"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Prompt (English)</h2>
            <Textarea value={resultEN} readOnly className="min-h-[160px] bg-muted/50" />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Share:</span>
            <a
              href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <Share2 size={20} />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <Share2 size={20} />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <Share2 size={20} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
} 