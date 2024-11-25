import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the CSV file
const csvFilePath = path.join(__dirname, 'words.csv'); // Replace with your CSV file path
const jsFilePath = path.join(__dirname, 'drawableWords.js'); // Replace with your JS file output path

fs.readFile(csvFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading CSV file:', err);
    return;
  }

  // Split the CSV data into lines and remove any empty lines
  const lines = data
    .split('\n')
    .map(line => line.trim())
    .filter(line => line);

  // Create the JS array format
  const jsContent = `const drawableWords = [\n${lines
    .map(line => `"${line}"`)
    .join(',\n')}\n];\n`;

  // Write the JS file
  fs.writeFile(jsFilePath, jsContent, 'utf8', err => {
    if (err) {
      console.error('Error writing JS file:', err);
    } else {
      console.log('JS file created successfully at', jsFilePath);
    }
  });
});
