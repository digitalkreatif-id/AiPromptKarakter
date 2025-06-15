export function buildPrompt(inputs) {
  const {
    title,
    cameraMovement,
    videoStyle,
    characterDesc,
    voiceDetail,
    characterAction,
    facialExpression,
    setting,
    atmosphere,
    ambientSound,
    dialogue,
    visualDetail,
    negativePrompt,
  } = inputs;

  return [
    `Judul Scene: ${title}`,
    `Pergerakan Kamera: ${cameraMovement}`,
    `Gaya Video: ${videoStyle}`,
    `Deskripsi Karakter: ${characterDesc}`,
    `Detail Suara Karakter: ${voiceDetail}`,
    `Aksi Karakter: ${characterAction}`,
    `Ekspresi Wajah Karakter: ${facialExpression}`,
    `Latar Tempat & Waktu: ${setting}`,
    `Suasana Keseluruhan Scene: ${atmosphere}`,
    `Suara Lingkungan: ${ambientSound}`,
    `Dialog Karakter: ${dialogue}`,
    `Detail Visual Tambahan: ${visualDetail}`,
    `Negative Prompt: ${negativePrompt}`,
  ]
    .filter(Boolean)
    .join('\n');
} 