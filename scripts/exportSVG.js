export function exportSVG(chartCanvas, chartSettings) {
  const svg = generateSVG(chartCanvas, chartSettings);
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${chartSettings.title}.svg`;
  link.click();
  URL.revokeObjectURL(url);
}

function generateSVG(canvas, settings) {
  const width = canvas.width;
  const height = canvas.height;

  // Це базова реалізація. Вам може знадобитися більш складна логіка
  // для точного відтворення графіка в SVG форматі.
  return `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${settings.backgroundColor}"/>
    <text x="50%" y="30" font-family="Arial" font-size="16" fill="${settings.textColor}" text-anchor="middle">${settings.title}</text>
    <!-- Тут повинна бути додаткова логіка для відтворення графіка -->
</svg>`;
}
