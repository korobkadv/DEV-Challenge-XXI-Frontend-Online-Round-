export function exportPNG(chartCanvas) {
  const dataURL = chartCanvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = "chart.png";
  link.href = dataURL;
  link.click();
}
