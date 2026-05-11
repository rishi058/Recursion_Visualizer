'use client';

export interface DefaultCodes {
  cpp: string;
  java: string;
  python: string;
  javascript: string;
}

export async function getDefaultCodes(): Promise<DefaultCodes> {
  const [cpp, java, python, javascript] = await Promise.all([
    fetch('/sample_codes/sample.cpp').then(r => r.text()),
    fetch('/sample_codes/sample.java').then(r => r.text()),
    fetch('/sample_codes/sample.py').then(r => r.text()),
    fetch('/sample_codes/sample.js').then(r => r.text()),
  ]);

  return { cpp, java, python, javascript };
}
