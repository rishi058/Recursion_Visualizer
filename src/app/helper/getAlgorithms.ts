'use server'

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
  try {
    // In deployed environments (Vercel, etc.) the filesystem is not accessible at
    // runtime. Instead we fetch the pre-generated static JSON that is built by
    // `scripts/generate-algo-data.mjs` (run via the `prebuild` npm hook) and
    // served as a public asset.
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

    const res = await fetch(`${baseUrl}/algorithms-data.json`, {
      // Always re-validate so a re-deploy picks up new algorithms.
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`Failed to fetch algorithms-data.json: ${res.status}`);
      return [];
    }

    const data: AlgorithmData[] = await res.json();
    return data;
  } catch (err) {
    console.error('getAlgorithmsData error:', err);
    return [];
  }
}
