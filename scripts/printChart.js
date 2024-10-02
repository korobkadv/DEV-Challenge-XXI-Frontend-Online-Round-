export function printChart(chartCanvas) {
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
        <html>
        <head>
            <title>Друк графіка</title>
            <style>
                body { margin: 0; padding: 0; }
                img { max-width: 100%; height: auto; }
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
