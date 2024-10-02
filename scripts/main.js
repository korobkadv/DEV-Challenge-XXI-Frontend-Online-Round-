// main.js
import { parseCSV, parseJSON, parseExcel } from "./fileParser.js";
import { drawLineChart, drawBarChart, drawPieChart } from "./chartDrawer.js";

document.addEventListener("DOMContentLoaded", function () {
  const dropZone = document.getElementById("dropZone");
  const fileInput = document.getElementById("fileInput");
  const chartCanvas = document.getElementById("chartCanvas");
  const ctx = chartCanvas.getContext("2d");
  const themeToggle = document.getElementById("themeToggle");

  let currentData = null;
  let currentChartType = "line";

  const chartSettings = {
    title: "Графік даних",
    xAxisLabel: "X",
    yAxisLabel: "Y",
    lineColor: "#3366cc",
    barColor: "#3366cc",
    pieColors: [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#FF9F40",
    ],
    backgroundColor: "#ffffff",
    textColor: "#000000",
  };

  // Налаштування drag-and-drop
  dropZone.addEventListener("dragover", handleDragOver);
  dropZone.addEventListener("dragleave", handleDragLeave);
  dropZone.addEventListener("drop", handleDrop);
  dropZone.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", handleFileSelect);

  document
    .getElementById("lineChart")
    .addEventListener("click", () => setChartType("line"));
  document
    .getElementById("barChart")
    .addEventListener("click", () => setChartType("bar"));
  document
    .getElementById("pieChart")
    .addEventListener("click", () => setChartType("pie"));
  document.getElementById("exportPNG").addEventListener("click", exportPNG);
  document.getElementById("exportSVG").addEventListener("click", exportSVG);
  document.getElementById("printChart").addEventListener("click", printChart);
  themeToggle.addEventListener("click", toggleTheme);

  // Налаштування кольорів
  document
    .getElementById("chartTitle")
    .addEventListener("input", updateChartSettings);
  document
    .getElementById("xAxisLabel")
    .addEventListener("input", updateChartSettings);
  document
    .getElementById("yAxisLabel")
    .addEventListener("input", updateChartSettings);
  document
    .getElementById("lineColor")
    .addEventListener("change", updateChartSettings);
  document
    .getElementById("barColor")
    .addEventListener("change", updateChartSettings);
  document
    .getElementById("backgroundColor")
    .addEventListener("change", updateChartSettings);
  document
    .getElementById("textColor")
    .addEventListener("change", updateChartSettings);

  // Ініціалізація налаштувань кольорів для кругової діаграми
  initPieColorInputs();

  // Встановлення початкової теми
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.className = `${savedTheme}-theme`;
  updateChartColors(savedTheme);

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    dropZone.classList.add("dragover");
  }

  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    dropZone.classList.remove("dragover");
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    dropZone.classList.remove("dragover");
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFile(files[0]);
    }
  }

  function handleFileSelect(e) {
    const files = e.target.files;
    if (files.length) {
      handleFile(files[0]);
    }
  }

  function handleFile(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const content = e.target.result;
      const fileType = file.name.split(".").pop().toLowerCase();

      switch (fileType) {
        case "csv":
          currentData = parseCSV(content);
          break;
        case "json":
          currentData = parseJSON(content);
          break;
        case "xls":
        case "xlsx":
          currentData = parseExcel(content);
          break;
        default:
          console.error("Непідтримуваний тип файлу");
          return;
      }

      console.log("Дані завантажено:", currentData);
      if (currentData) {
        drawChart();
      }
    };

    if (["xls", "xlsx"].includes(file.name.split(".").pop().toLowerCase())) {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file);
    }
  }

  function setChartType(type) {
    currentChartType = type;
    updateColorSettings();
    drawChart();
  }

  function updateColorSettings() {
    document.getElementById("lineColorSettings").style.display =
      currentChartType === "line" ? "block" : "none";
    document.getElementById("barColorSettings").style.display =
      currentChartType === "bar" ? "block" : "none";
    document.getElementById("pieColorSettings").style.display =
      currentChartType === "pie" ? "block" : "none";
  }

  function drawChart() {
    if (!currentData) {
      console.error("Спочатку завантажте дані");
      return;
    }

    switch (currentChartType) {
      case "line":
        drawLineChart(
          ctx,
          currentData,
          chartCanvas.width,
          chartCanvas.height,
          chartSettings
        );
        break;
      case "bar":
        drawBarChart(
          ctx,
          currentData,
          chartCanvas.width,
          chartCanvas.height,
          chartSettings
        );
        break;
      case "pie":
        drawPieChart(
          ctx,
          currentData,
          chartCanvas.width,
          chartCanvas.height,
          chartSettings
        );
        break;
    }
  }

  function updateChartSettings() {
    chartSettings.title = document.getElementById("chartTitle").value;
    chartSettings.xAxisLabel = document.getElementById("xAxisLabel").value;
    chartSettings.yAxisLabel = document.getElementById("yAxisLabel").value;
    chartSettings.lineColor = document.getElementById("lineColor").value;
    chartSettings.barColor = document.getElementById("barColor").value;
    chartSettings.backgroundColor =
      document.getElementById("backgroundColor").value;
    chartSettings.textColor = document.getElementById("textColor").value;
    drawChart();
  }

  function initPieColorInputs() {
    const pieColorsContainer = document.getElementById("pieColors");
    chartSettings.pieColors.forEach((color, index) => {
      const input = document.createElement("input");
      input.type = "color";
      input.value = color;
      input.addEventListener("change", (e) => {
        chartSettings.pieColors[index] = e.target.value;
        if (currentChartType === "pie") drawChart();
      });
      pieColorsContainer.appendChild(input);
    });
  }

  function exportPNG() {
    if (!chartCanvas) return;
    const dataURL = chartCanvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "chart.png";
    link.href = dataURL;
    link.click();
  }

  function exportSVG() {
    if (!currentData) {
      console.error("Спочатку завантажте дані");
      return;
    }

    let svgContent;
    switch (currentChartType) {
      case "line":
        svgContent = generateLineSVG(currentData, chartSettings);
        break;
      case "bar":
        svgContent = generateBarSVG(currentData, chartSettings);
        break;
      case "pie":
        svgContent = generatePieSVG(currentData, chartSettings);
        break;
      default:
        console.error("Невідомий тип графіка");
        return;
    }

    const blob = new Blob([svgContent], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${chartSettings.title}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function printChart() {
    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
            <html>
            <head>
                <title>Друк графіка</title>
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                    }
                    canvas {
                        max-width: 100%;
                        height: auto;
                    }
                </style>
            </head>
            <body>
                <img src="${chartCanvas.toDataURL(
                  "image/png"
                )}" onload="window.print();window.close()"/>
            </body>
            </html>
        `);

    printWindow.document.close();
  }

  function toggleTheme() {
    const currentTheme = document.body.className.includes("light")
      ? "light"
      : "dark";
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.body.className = `${newTheme}-theme`;
    localStorage.setItem("theme", newTheme);
    updateChartColors(newTheme);

    if (currentData) {
      drawChart();
    }
  }

  function updateChartColors(theme) {
    if (theme === "dark") {
      chartSettings.backgroundColor = getComputedStyle(
        document.body
      ).getPropertyValue("--dark-background");
      chartSettings.textColor = getComputedStyle(
        document.body
      ).getPropertyValue("--dark-text");
    } else {
      chartSettings.backgroundColor = getComputedStyle(
        document.body
      ).getPropertyValue("--light-background");
      chartSettings.textColor = getComputedStyle(
        document.body
      ).getPropertyValue("--light-text");
    }
    document.getElementById("backgroundColor").value =
      chartSettings.backgroundColor;
    document.getElementById("textColor").value = chartSettings.textColor;
  }

  // Налаштування розміру canvas
  function resizeCanvas() {
    const container = chartCanvas.parentElement;
    chartCanvas.width = container.clientWidth;
    chartCanvas.height = container.clientHeight;
    if (currentData) {
      drawChart();
    }
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  updateColorSettings();
});

// Функції для генерації SVG
function generateLineSVG(data, settings) {
  const width = 800;
  const height = 600;
  const padding = 60;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const xValues = data.map((item) => item[Object.keys(item)[0]]);
  const yValues = data.map((item) => parseFloat(item[Object.keys(item)[1]]));
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);

  let pathData = "";
  let xLabels = "";
  data.forEach((item, index) => {
    const x = padding + (index / (data.length - 1)) * chartWidth;
    const y =
      height -
      padding -
      ((item[Object.keys(item)[1]] - minY) / (maxY - minY)) * chartHeight;
    pathData += (index === 0 ? "M" : "L") + `${x},${y}`;

    xLabels += `<text x="${x}" y="${
      height - padding + 20
    }" font-family="Arial" font-size="10" fill="${
      settings.textColor
    }" text-anchor="middle">${item[Object.keys(item)[0]]}</text>`;
  });

  let yLabels = "";
  for (let i = 0; i <= 5; i++) {
    const y = height - padding - (i / 5) * chartHeight;
    const value = minY + (i / 5) * (maxY - minY);
    yLabels += `<text x="${
      padding - 10
    }" y="${y}" font-family="Arial" font-size="10" fill="${
      settings.textColor
    }" text-anchor="end" alignment-baseline="middle">${value.toFixed(
      2
    )}</text>`;
  }

  return `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="${
              settings.backgroundColor
            }"/>
            <text x="${width / 2}" y="${
    padding / 2
  }" font-family="Arial" font-size="16" fill="${
    settings.textColor
  }" text-anchor="middle">${settings.title}</text>
            <line x1="${padding}" y1="${height - padding}" x2="${
    width - padding
  }" y2="${height - padding}" stroke="${settings.textColor}" />
            <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${
    height - padding
  }" stroke="${settings.textColor}" />
            <path d="${pathData}" fill="none" stroke="${
    settings.lineColor
  }" stroke-width="2" />
            ${xLabels}
            ${yLabels}
            <text x="${width / 2}" y="${
    height - 5
  }" font-family="Arial" font-size="12" fill="${
    settings.textColor
  }" text-anchor="middle">${settings.xAxisLabel}</text>
            <text x="5" y="${
              height / 2
            }" font-family="Arial" font-size="12" fill="${
    settings.textColor
  }" text-anchor="middle" transform="rotate(-90 10,${height / 2})">${
    settings.yAxisLabel
  }</text>
        </svg>
    `;
}

// Функція генерації SVG для стовпчикової діаграми
function generateBarSVG(data, settings) {
  const width = 800;
  const height = 600;
  const padding = 60;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const yValues = data.map((item) => parseFloat(item[Object.keys(item)[1]]));
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);

  const barWidth = (chartWidth / data.length) * 0.8;
  const barSpacing = (chartWidth / data.length) * 0.2;

  let barsData = "";
  let xLabels = "";
  data.forEach((item, index) => {
    const x = padding + index * (barWidth + barSpacing);
    const barHeight =
      ((item[Object.keys(item)[1]] - minY) / (maxY - minY)) * chartHeight;
    const y = height - padding - barHeight;
    barsData += `<rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" fill="${settings.barColor}" />`;

    xLabels += `<text x="${x + barWidth / 2}" y="${
      height - padding + 20
    }" font-family="Arial" font-size="10" fill="${
      settings.textColor
    }" text-anchor="middle">${item[Object.keys(item)[0]]}</text>`;
  });

  let yLabels = "";
  for (let i = 0; i <= 5; i++) {
    const y = height - padding - (i / 5) * chartHeight;
    const value = minY + (i / 5) * (maxY - minY);
    yLabels += `<text x="${
      padding - 10
    }" y="${y}" font-family="Arial" font-size="10" fill="${
      settings.textColor
    }" text-anchor="end" alignment-baseline="middle">${value.toFixed(
      2
    )}</text>`;
  }

  return `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="${
              settings.backgroundColor
            }"/>
            <text x="${width / 2}" y="${
    padding / 2
  }" font-family="Arial" font-size="16" fill="${
    settings.textColor
  }" text-anchor="middle">${settings.title}</text>
            <line x1="${padding}" y1="${height - padding}" x2="${
    width - padding
  }" y2="${height - padding}" stroke="${settings.textColor}" />
            <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${
    height - padding
  }" stroke="${settings.textColor}" />
            ${barsData}
            ${xLabels}
            ${yLabels}
            <text x="${width / 2}" y="${
    height - 5
  }" font-family="Arial" font-size="12" fill="${
    settings.textColor
  }" text-anchor="middle">${settings.xAxisLabel}</text>
            <text x="5" y="${
              height / 2
            }" font-family="Arial" font-size="12" fill="${
    settings.textColor
  }" text-anchor="middle" transform="rotate(-90 10,${height / 2})">${
    settings.yAxisLabel
  }</text>
        </svg>
    `;
}

// Функція генерації SVG для кругової діаграми
function generatePieSVG(data, settings) {
  const width = 800;
  const height = 600;
  const radius = Math.min(width, height) / 2 - 40;
  const centerX = width / 2;
  const centerY = height / 2;

  const total = data.reduce(
    (sum, item) => sum + parseFloat(item[Object.keys(item)[1]]),
    0
  );

  let slicesData = "";
  let legendData = "";
  let startAngle = 0;
  data.forEach((item, index) => {
    const value = parseFloat(item[Object.keys(item)[1]]);
    const sliceAngle = (value / total) * 2 * Math.PI;
    const endAngle = startAngle + sliceAngle;
    const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;
    const startX = centerX + radius * Math.cos(startAngle);
    const startY = centerY + radius * Math.sin(startAngle);
    const endX = centerX + radius * Math.cos(endAngle);
    const endY = centerY + radius * Math.sin(endAngle);

    slicesData += `<path d="M${centerX},${centerY} L${startX},${startY} A${radius},${radius} 0 ${largeArcFlag},1 ${endX},${endY} Z" fill="${
      settings.pieColors[index % settings.pieColors.length]
    }" />`;

    const legendY = 40 + index * 20;
    legendData += `
            <rect x="${
              width - 150
            }" y="${legendY}" width="15" height="15" fill="${
      settings.pieColors[index % settings.pieColors.length]
    }" />
            <text x="${width - 130}" y="${
      legendY + 12
    }" font-family="Arial" font-size="12" fill="${settings.textColor}">${
      item[Object.keys(item)[0]]
    }: ${((value / total) * 100).toFixed(1)}%</text>
        `;

    startAngle = endAngle;
  });

  return `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="${
              settings.backgroundColor
            }"/>
            <text x="${
              width / 2
            }" y="20" font-family="Arial" font-size="16" fill="${
    settings.textColor
  }" text-anchor="middle">${settings.title}</text>
            ${slicesData}
            ${legendData}
        </svg>
    `;
}
