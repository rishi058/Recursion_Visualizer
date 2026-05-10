'use server'

import fs from 'fs';
import path from 'path';

export interface AlgorithmCode {
  language: string;
  extension: string;
  content: string;
}

export interface AlgorithmData {
  name: string;
  folderName: string;
  codes: AlgorithmCode[];
}

export async function getAlgorithmsData(): Promise<AlgorithmData[]> {
  const algoDir = path.join(process.cwd(), 'public/sample_codes/algo');
  
  if (!fs.existsSync(algoDir)) {
    return [];
  }

  const folders = fs.readdirSync(algoDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const algorithms: AlgorithmData[] = folders.map(folder => {
    const folderPath = path.join(algoDir, folder);
    const files = fs.readdirSync(folderPath);
    
    const codes: AlgorithmCode[] = files.map(file => {
      const ext = path.extname(file).slice(1);
      const filePath = path.join(folderPath, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      let language = ext;
      if (ext === 'cpp') language = 'cpp';
      if (ext === 'java') language = 'java';
      if (ext === 'js') language = 'javascript';
      if (ext === 'py') language = 'python';

      return {
        language,
        extension: ext,
        content
      };
    });

    // Format name: binary_search -> Binary Search, TOH -> TOH
    const name = folder.includes('_')
      ? folder.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      : folder === folder.toUpperCase() ? folder : folder.charAt(0).toUpperCase() + folder.slice(1);

    return {
      name,
      folderName: folder,
      codes
    };
  });

  return algorithms;
}
