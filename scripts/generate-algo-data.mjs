import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const algoDir = path.join(__dirname, '..', 'public', 'sample_codes', 'algo');
const outputFile = path.join(__dirname, '..', 'public', 'algorithms-data.json');

if (!fs.existsSync(algoDir)) {
  console.warn('⚠️  algo directory not found, writing empty array.');
  fs.writeFileSync(outputFile, JSON.stringify([]), 'utf-8');
  process.exit(0);
}

const folders = fs
  .readdirSync(algoDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

const algorithms = folders.map((folder) => {
  const folderPath = path.join(algoDir, folder);
  const files = fs.readdirSync(folderPath);

  const codes = files.map((file) => {
    const ext = path.extname(file).slice(1);
    const filePath = path.join(folderPath, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    let language = ext;
    if (ext === 'cpp') language = 'cpp';
    if (ext === 'java') language = 'java';
    if (ext === 'js') language = 'javascript';
    if (ext === 'py') language = 'python';

    return { language, extension: ext, content };
  });

  // Format name: binary_search -> Binary Search, TOH -> TOH
  const name = folder.includes('_')
    ? folder
        .split('_')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : folder === folder.toUpperCase()
    ? folder
    : folder.charAt(0).toUpperCase() + folder.slice(1);

  return { name, folderName: folder, codes };
});

fs.writeFileSync(outputFile, JSON.stringify(algorithms, null, 2), 'utf-8');
console.log(`✅ Generated algorithms-data.json with ${algorithms.length} algorithm(s).`);
