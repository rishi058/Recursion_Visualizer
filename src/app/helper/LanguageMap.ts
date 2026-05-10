interface Language {
  id: number;
}

export interface LanguageMap {
  [key: string]: Language;
}

// Only stores Judge0 language IDs.
// Default code for each language is loaded dynamically from public/sample_codes/
// via the getDefaultCodes server action.
export const languageMapData: LanguageMap = {
  cpp: {
    id: 54,
  },
  java: {
    id: 62,
  },
  python: {
    id: 71,
  },
  javascript: {
    id: 63,
  },
};