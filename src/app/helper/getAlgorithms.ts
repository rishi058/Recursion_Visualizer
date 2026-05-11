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
  const res = await fetch('/algorithms-data.json');
  if (!res.ok) throw new Error(`Failed to fetch algorithms-data.json: ${res.status}`);
  return res.json() as Promise<AlgorithmData[]>;
}
