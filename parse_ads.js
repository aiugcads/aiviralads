import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fs = require("fs");
const path = require("path");

function parseCSV(csvText) {
  let inQuote = false;
  let currentRow = [];
  let currentCell = '';
  const rows = [];
  
  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    
    if (char === '"') {
      inQuote = !inQuote;
    } else if (char === ',' && !inQuote) {
      currentRow.push(currentCell.trim());
      currentCell = '';
    } else if (char === '\n' && !inQuote) {
      currentRow.push(currentCell.trim());
      rows.push(currentRow);
      currentRow = [];
      currentCell = '';
    } else {
      currentCell += char;
    }
  }
  
  if (currentCell || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    rows.push(currentRow);
  }
  
  return rows;
}

try {
  const filePath = path.join(process.cwd(), 'aiviral_data - ads videos.csv');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  
  const rows = parseCSV(fileContent);
  const headers = rows[0];
  const data = rows.slice(1).filter(r => r.length > 1).map(row => {
    let obj = {};
    headers.forEach((h, i) => {
      let val = row[i] || '';
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.slice(1, -1);
      }
      val = val.replace(/""/g, '"').trim();
      obj[h.trim()] = val;
    });
    return obj;
  });

  const tsContent = `export interface AdVideo {
  id: string;
  title: string;
  description: string;
  category: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
}

export const adsVideosData: AdVideo[] = ${JSON.stringify(data, null, 2)};
`;

  const outputPath = path.join(process.cwd(), 'src', 'data', 'adsVideos.ts');
  fs.writeFileSync(outputPath, tsContent, 'utf-8');
  console.log('Successfully wrote to src/data/adsVideos.ts: ' + data.length + ' records');
} catch(e) {
  console.error("Error", e);
}
