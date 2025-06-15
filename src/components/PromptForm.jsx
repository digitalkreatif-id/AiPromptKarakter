import React from 'react';
import PropTypes from 'prop-types';

const cameraMovementOptions = ['Static', 'Zoom In', 'Tracking Shot', 'Pan', 'Orbit', 'First-person', 'Drone'];
const videoStyleOptions = ['Cinematic', 'Vlog', 'Dokumenter', 'Interview', 'Horor Found Footage', 'Animasi', 'Berita', 'Sinetron'];

function PromptForm({ inputs, onChange, onSubmit, loading, onReset }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="title">
          Judul Scene
        </label>
        <input
          id="title"
          type="text"
          value={inputs.title}
          onChange={onChange('title')}
          className="w-full border border-gray-300 rounded-md p-2 focus:border-primary focus:ring-primary/30 focus:outline-none"
          required
        />
      </div>

      {/* Camera Movement */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="cameraMovement">
          Pergerakan Kamera
        </label>
        <select
          id="cameraMovement"
          value={inputs.cameraMovement}
          onChange={onChange('cameraMovement')}
          className="w-full border border-gray-300 rounded-md p-2 focus:border-primary focus:ring-primary/30 focus:outline-none"
        >
          {cameraMovementOptions.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Video Style */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="videoStyle">
          Gaya Video
        </label>
        <select
          id="videoStyle"
          value={inputs.videoStyle}
          onChange={onChange('videoStyle')}
          className="w-full border border-gray-300 rounded-md p-2 focus:border-primary focus:ring-primary/30 focus:outline-none"
        >
          {videoStyleOptions.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Textareas */}
      {[
        ['characterDesc', 'Deskripsi Karakter'],
        ['voiceDetail', 'Detail Suara Karakter'],
        ['characterAction', 'Aksi Karakter'],
        ['facialExpression', 'Ekspresi Wajah Karakter'],
        ['setting', 'Latar Tempat & Waktu'],
        ['atmosphere', 'Suasana Keseluruhan Scene'],
        ['ambientSound', 'Suara Lingkungan'],
        ['dialogue', 'Dialog Karakter'],
        ['visualDetail', 'Detail Visual Tambahan'],
        ['negativePrompt', 'Negative Prompt'],
      ].map(([key, label]) => (
        <div key={key}>
          <label className="block text-sm font-medium mb-1" htmlFor={key}>
            {label}
          </label>
          <textarea
            id={key}
            value={inputs[key]}
            onChange={onChange(key)}
            rows={3}
            className="w-full border border-gray-300 rounded-md p-2 focus:border-primary focus:ring-primary/30 focus:outline-none"
          />
        </div>
      ))}

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-60"
        >
          {loading ? 'Menghasilkan…' : 'Generate Prompt'}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50"
        >
          Reset
        </button>
      </div>
    </form>
  );
}

PromptForm.propTypes = {
  inputs: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default PromptForm; 