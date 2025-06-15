import React from 'react';
import PropTypes from 'prop-types';

function ShareButtons({ promptId, promptEn }) {
  const shareText = `${promptId}\n\n${promptEn}`.trim();

  const canShare = navigator.share;

  const handleShare = async () => {
    if (canShare) {
      try {
        await navigator.share({
          title: 'AI Video Prompt',
          text: shareText,
        });
      } catch (err) {
        console.error('Share canceled', err);
      }
    } else {
      // Fallback copy to clipboard
      navigator.clipboard.writeText(shareText);
      alert('Prompt disalin ke clipboard');
    }
  };

  return (
    <div className="mt-6 flex justify-end">
      <button
        onClick={handleShare}
        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
      >
        Share
      </button>
    </div>
  );
}

ShareButtons.propTypes = {
  promptId: PropTypes.string.isRequired,
  promptEn: PropTypes.string,
};

export default ShareButtons; 