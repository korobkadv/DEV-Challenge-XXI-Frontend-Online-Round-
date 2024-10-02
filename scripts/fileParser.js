export function parseCSV(content) {
  const lines = content.split("\n");
  const headers = lines[0].split(",");
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    if (values.length === headers.length) {
      const entry = {};
      for (let j = 0; j < headers.length; j++) {
        entry[headers[j].trim()] = values[j].trim();
      }
      data.push(entry);
    }
  }

  return data;
}

export function parseJSON(content) {
  try {
    return JSON.parse(content);
  } catch (error) {
    console.error("Помилка парсингу JSON:", error);
    return null;
  }
}

export function parseExcel(content) {
  console.log("Парсинг Excel файлів не реалізовано");
  return null;
}
