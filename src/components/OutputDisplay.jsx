import React from 'react';
import PropTypes from 'prop-types';

function OutputDisplay({ result }) {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // Optionally notify
    });
  };

  if (!result?.id) return null;

  return (
    <div className="mt-8 space-y-6">
      <section>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Prompt Bahasa Indonesia</h2>
          <button
            className="text-primary text-sm hover:underline"
            onClick={() => copyToClipboard(result.id)}
          >
            Salin
          </button>
        </div>
        <div className="whitespace-pre-wrap bg-gray-50 border border-gray-200 rounded-md p-4 text-sm">
          {result.id}
        </div>
      </section>

      {result.en && (
        <section>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Prompt English</h2>
            <button
              className="text-primary text-sm hover:underline"
              onClick={() => copyToClipboard(result.en)}
            >
              Copy
            </button>
          </div>
          <div className="whitespace-pre-wrap bg-gray-50 border border-gray-200 rounded-md p-4 text-sm">
            {result.en}
          </div>
        </section>
      )}
    </div>
  );
}

OutputDisplay.propTypes = {
  result: PropTypes.shape({
    id: PropTypes.string,
    en: PropTypes.string,
  }).isRequired,
};

export default OutputDisplay; 