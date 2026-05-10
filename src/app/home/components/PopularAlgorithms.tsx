"use client";

import React, { useState, useEffect } from 'react';
import { getAlgorithmsData, AlgorithmData, AlgorithmCode } from '../../helper/getAlgorithms';
import CodeEditor from './IDE/CodeEditor';
import Select from 'react-select';
import toast from 'react-hot-toast';

function PopularAlgorithms() {
  const [algorithms, setAlgorithms] = useState<AlgorithmData[]>([]);
  const [selectedAlgo, setSelectedAlgo] = useState<AlgorithmData | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [currentCode, setCurrentCode] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAlgorithmsData();
        setAlgorithms(data);
        if (data.length > 0) {
          const firstAlgo = data[0];
          setSelectedAlgo(firstAlgo);
          if (firstAlgo.codes.length > 0) {
            setSelectedLanguage(firstAlgo.codes[0].language);
            setCurrentCode(firstAlgo.codes[0].content);
          }
        }
      } catch (error) {
        console.error("Failed to load algorithms:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (selectedAlgo && selectedLanguage) {
      const code = selectedAlgo.codes.find(c => c.language === selectedLanguage);
      if (code) {
        setCurrentCode(code.content);
      }
    }
  }, [selectedAlgo, selectedLanguage]);

  const handleAlgoChange = (algo: AlgorithmData) => {
    setSelectedAlgo(algo);
    // Try to keep the same language if available, otherwise pick the first one
    const hasCurrentLang = algo.codes.find(c => c.language === selectedLanguage);
    if (!hasCurrentLang && algo.codes.length > 0) {
      setSelectedLanguage(algo.codes[0].language);
    }
  };

  const languageOptions = selectedAlgo?.codes.map(c => ({
    value: c.language,
    label: c.language.charAt(0).toUpperCase() + c.language.slice(1)
  })) || [];

  const selectedLangOption = languageOptions.find(opt => opt.value === selectedLanguage) || null;

  const selectStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor: '#1a1f2c',
      borderColor: '#424754',
      color: '#dee2f4',
      minHeight: '22px',
      height: '22px',
      fontSize: '12px',
      borderRadius: '6px',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#626774'
      }
    }),
    valueContainer: (base: any) => ({
      ...base,
      padding: '0 6px',
      margin: 0,
    }),
    input: (base: any) => ({
      ...base,
      margin: 0,
      padding: 0,
      color: '#dee2f4'
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    indicatorsContainer: (base: any) => ({
      ...base,
      height: '22px',
    }),
    dropdownIndicator: (base: any) => ({
      ...base,
      padding: '2px 4px',
      color: '#8e919e'
    }),
    singleValue: (base: any) => ({
      ...base,
      color: '#dee2f4',
      margin: 0,
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: '#252a37',
      borderRadius: '8px',
      overflow: 'hidden',
      border: '1px solid #424754',
      zIndex: 50
    }),
    menuPortal: (base: any) => ({
      ...base,
      zIndex: 9999
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused ? '#303442' : '#252a37',
      color: state.isSelected ? '#ffffff' : '#dee2f4',
      padding: '4px 8px',
      fontSize: '12px',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: '#3d4251'
      }
    })
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
        <p className="mt-4 text-on-surface-variant font-medium">Loading Algorithms...</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 py-2">
      <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-on-surface">Popular Recursion Algorithms</h2>
        <p className="text-on-surface-variant text-sm">
          Copy code from here and Paste in above IDE to test them.
        </p>
      </div>

      {/* Chips Selection */}
      <div className="flex flex-wrap justify-center gap-4">
        {algorithms.map((algo) => (
          <button
            key={algo.folderName}
            onClick={() => handleAlgoChange(algo)}
            className={`px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 border ${
              selectedAlgo?.folderName === algo.folderName
                ? "bg-primary text-on-primary border-primary shadow-[0_0_15px_rgba(var(--primary-rgb,59,130,246),0.5)] scale-105"
                : "bg-surface-container-high text-on-surface-variant border-outline-variant hover:border-primary/50 hover:bg-surface-container-highest"
            }`}
          >
            {algo.name}
          </button>
        ))}
      </div>

      {/* Code Display IDE Style */}
      <div className="w-full max-w-5xl mx-auto bg-surface-container-low border border-outline-variant/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[560px]">
        {/* Header */}
        <div className="bg-surface-container-highest px-3 py-0.5 flex items-center justify-between border-b border-outline-variant/30 backdrop-blur-md bg-opacity-80 flex-wrap gap-2">
          <div className="flex items-center gap-2 text-on-surface font-medium text-xs">  
             <span className="material-symbols-outlined !text-[14px] text-primary">code</span>
             {selectedAlgo?.name}
          </div>

           <div className="flex items-center gap-2"> 
            <div className="w-32">
              <Select
                options={languageOptions}
                value={selectedLangOption}
                onChange={(opt: any) => setSelectedLanguage(opt.value)}
                styles={selectStyles}
                isSearchable={false}
                menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
              />
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(currentCode);
                toast.success("Code copied to clipboard!");
              }}
              className="text-on-surface-variant hover:text-primary transition-all flex items-center justify-center p-1 rounded hover:bg-surface-container-low active:scale-95"
              title="Copy Code"
            >
              <span className="material-symbols-outlined !text-[14px]">content_copy</span>
            </button>
          </div>
        </div>

        {/* Code Editor Body */}
        <div className="flex-grow overflow-hidden relative bg-[#0d1117]">
          {selectedAlgo && selectedLanguage ? (
            <CodeEditor
              currentLanguage={selectedLanguage}
              currentTheme="githubDark"
              currentCode={currentCode}
              setCurrentCode={setCurrentCode}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-on-surface-variant italic">
              No code available for this selection.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PopularAlgorithms;
