export function drawLineChart(ctx, data, width, height, settings = {}) {
  const {
    title = "Лінійний графік",
    xAxisLabel = "X",
    yAxisLabel = "Y",
    lineColor = "#3366cc",
    lineWidth = 2,
    showPoints = true,
    pointRadius = 3,
    pointColor = "#3366cc",
    backgroundColor = "#ffffff",
    textColor = "#000000",
  } = settings;

  // Очищення canvas
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);

  // Отримання ключів та значень
  const keys = Object.keys(data[0]);
  const xKey = keys[0];
  const yKey = keys[1];

  // Знаходження мінімальних та максимальних значень
  const xValues = data.map((item) => item[xKey]);
  const yValues = data.map((item) => parseFloat(item[yKey]));
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);

  // Налаштування розмірів та відступів
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // Додавання заголовка графіка
  ctx.fillStyle = textColor;
  ctx.font = "bold 16px Arial";
  ctx.textAlign = "center";
  ctx.fillText(title, width / 2, padding / 2);

  // Малювання осей
  ctx.beginPath();
  ctx.strokeStyle = textColor;
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  ctx.stroke();

  // Малювання лінії графіка
  ctx.beginPath();
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineWidth;
  data.forEach((item, index) => {
    const x = padding + (index / (data.length - 1)) * chartWidth;
    const y =
      height - padding - ((item[yKey] - minY) / (maxY - minY)) * chartHeight;
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.stroke();

  // Малювання точок
  if (showPoints) {
    ctx.fillStyle = pointColor;
    data.forEach((item, index) => {
      const x = padding + (index / (data.length - 1)) * chartWidth;
      const y =
        height - padding - ((item[yKey] - minY) / (maxY - minY)) * chartHeight;
      ctx.beginPath();
      ctx.arc(x, y, pointRadius, 0, 2 * Math.PI);
      ctx.fill();
    });
  }

  // Додавання підписів осей
  ctx.fillStyle = textColor;
  ctx.font = "12px Arial";
  ctx.textAlign = "center";
  ctx.fillText(xAxisLabel, width / 2, height - 10);
  ctx.save();
  ctx.translate(10, height / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText(yAxisLabel, 0, 0);
  ctx.restore();

  // Додаємо мітки на осі
  const xStep = chartWidth / (data.length - 1);
  const yStep = chartHeight / 5;

  ctx.textAlign = "center";
  for (let i = 0; i < data.length; i += Math.ceil(data.length / 10)) {
    const x = padding + i * xStep;
    ctx.fillText(data[i][xKey], x, height - padding + 15);
  }

  ctx.textAlign = "right";
  for (let i = 0; i <= 5; i++) {
    const y = height - padding - i * yStep;
    const value = minY + (i / 5) * (maxY - minY);
    ctx.fillText(value.toFixed(2), padding - 5, y);
  }
}

export function drawBarChart(ctx, data, width, height, settings = {}) {
  const {
    title = "Стовпчикова діаграма",
    xAxisLabel = "X",
    yAxisLabel = "Y",
    barColor = "#3366cc",
    backgroundColor = "#ffffff",
    textColor = "#000000",
  } = settings;

  // Очищення canvas
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);

  // Отримання ключів та значень
  const keys = Object.keys(data[0]);
  const xKey = keys[0];
  const yKey = keys[1];

  // Знаходження мінімальних та максимальних значень
  const yValues = data.map((item) => parseFloat(item[yKey]));
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);

  // Налаштування розмірів та відступів
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // Додавання заголовка графіка
  ctx.fillStyle = textColor;
  ctx.font = "bold 16px Arial";
  ctx.textAlign = "center";
  ctx.fillText(title, width / 2, padding / 2);

  // Малювання осей
  ctx.beginPath();
  ctx.strokeStyle = textColor;
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  ctx.stroke();

  // Малювання стовпчиків
  const barWidth = (chartWidth / data.length) * 0.8;
  const barSpacing = (chartWidth / data.length) * 0.2;

  ctx.fillStyle = barColor;
  data.forEach((item, index) => {
    const x = padding + index * (barWidth + barSpacing);
    const barHeight = ((item[yKey] - minY) / (maxY - minY)) * chartHeight;
    const y = height - padding - barHeight;
    ctx.fillRect(x, y, barWidth, barHeight);
  });

  // Додавання підписів осей
  ctx.fillStyle = textColor;
  ctx.font = "12px Arial";
  ctx.textAlign = "center";
  ctx.fillText(xAxisLabel, width / 2, height - 10);
  ctx.save();
  ctx.translate(10, height / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText(yAxisLabel, 0, 0);
  ctx.restore();

  // Додаємо мітки на осі
  ctx.textAlign = "center";
  data.forEach((item, index) => {
    const x = padding + index * (barWidth + barSpacing) + barWidth / 2;
    ctx.fillText(item[xKey], x, height - padding + 15);
  });

  ctx.textAlign = "right";
  for (let i = 0; i <= 5; i++) {
    const y = height - padding - (i / 5) * chartHeight;
    const value = minY + (i / 5) * (maxY - minY);
    ctx.fillText(value.toFixed(2), padding - 5, y);
  }
}

export function drawPieChart(ctx, data, width, height, settings = {}) {
  const {
    title = "Кругова діаграма",
    backgroundColor = "#ffffff",
    textColor = "#000000",
    pieColors = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#FF9F40",
    ],
  } = settings;

  // Очищення canvas
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);

  // Отримання ключів та значень
  const keys = Object.keys(data[0]);
  const labelKey = keys[0];
  const valueKey = keys[1];

  // Обчислення загальної суми
  const total = data.reduce((sum, item) => sum + parseFloat(item[valueKey]), 0);

  // Налаштування розмірів та відступів
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 40;

  // Додавання заголовка графіка
  ctx.fillStyle = textColor;
  ctx.font = "bold 16px Arial";
  ctx.textAlign = "center";
  ctx.fillText(title, width / 2, 20);

  let startAngle = 0;
  data.forEach((item, index) => {
    const sliceAngle = (item[valueKey] / total) * 2 * Math.PI;
    const endAngle = startAngle + sliceAngle;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();

    ctx.fillStyle = pieColors[index % pieColors.length];
    ctx.fill();

    // Додавання підписів
    const midAngle = startAngle + sliceAngle / 2;
    const labelRadius = radius * 0.7;
    const labelX = centerX + labelRadius * Math.cos(midAngle);
    const labelY = centerY + labelRadius * Math.sin(midAngle);

    ctx.fillStyle = textColor;
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const percentage = ((item[valueKey] / total) * 100).toFixed(1);
    ctx.fillText(`${item[labelKey]}: ${percentage}%`, labelX, labelY);

    startAngle = endAngle;
  });

  // Додавання легенди
  const legendX = width - 100;
  const legendY = 40;
  ctx.font = "12px Arial";
  ctx.textAlign = "left";
  data.forEach((item, index) => {
    const y = legendY + index * 20;
    ctx.fillStyle = pieColors[index % pieColors.length];
    ctx.fillRect(legendX, y, 15, 15);
    ctx.fillStyle = textColor;
    ctx.fillText(item[labelKey], legendX + 20, y + 12);
  });
}
