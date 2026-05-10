'use server'

import fs from 'fs';
import path from 'path';

export interface DefaultCodes {
  cpp: string;
  java: string;
  python: string;
  javascript: string;
}

const EXTENSION_MAP: Record<string, keyof DefaultCodes> = {
  cpp: 'cpp',
  java: 'java',
  py: 'python',
  js: 'javascript',
};

export async function getDefaultCodes(): Promise<DefaultCodes> {
  const sampleDir = path.join(process.cwd(), 'public/sample_codes');

  const defaults: DefaultCodes = {
    cpp: '',
    java: '',
    python: '',
    javascript: '',
  };

  if (!fs.existsSync(sampleDir)) {
    return defaults;
  }

  const files = fs.readdirSync(sampleDir).filter(f => {
    const ext = path.extname(f).slice(1);
    return ext in EXTENSION_MAP && f.startsWith('sample.');
  });

  for (const file of files) {
    const ext = path.extname(file).slice(1) as keyof typeof EXTENSION_MAP;
    const language = EXTENSION_MAP[ext];
    const filePath = path.join(sampleDir, file);
    defaults[language] = fs.readFileSync(filePath, 'utf-8');
  }

  return defaults;
}
