import React, { useState } from "react";
import CodeEditor from "./CodeEditor";
import Select from "react-select";
import { languageMapData } from "../../../helper/LanguageMap";
import useLocalStorageState from "../../../hooks/localStorage";

const EditorContainer = ({
  currentLanguage,
  setCurrentLanguage,
  currentCode,
  setCurrentCode,
  reset,
}: {
  currentLanguage: string;
  setCurrentLanguage: (language: string) => void;
  currentCode: string;
  setCurrentCode: (code: string) => void;
  reset: ()=>void;
}) => {
  
  const themeOptions = [
    { value: "githubDark", label: "githubDark" },
    { value: "githubLight", label: "githubLight" },
    { value: "bespin", label: "bespin" },
    { value: "duotoneDark", label: "duotoneDark" },
    { value: "duotoneLight", label: "duotoneLight" },
    { value: "dracula", label: "dracula" },
    { value: "xcodeDark", label: "xcodeDark" },
    { value: "xcodeLight", label: "xcodeLight" },
    { value: "vscodeDark", label: "vscodeDark" },
    { value: "vscodeLight", label: "vscodeLight" },
    { value: "okaidia", label: "okaidia" },
  ];

  const languageOptions = [
    { value: "cpp", label: "cpp" },
    { value: "javascript", label: "javascript" },
    { value: "java", label: "java" },
    { value: "python", label: "python" },
  ];

  const [savedTheme, setSavedTheme] = useLocalStorageState("ide_theme", "githubDark");

  const [currentTheme, setCurrentTheme] = useState(() => {
    for (let i = 0; i < themeOptions.length; i++) {
      if (themeOptions[i].value === savedTheme) {
        return themeOptions[i];
      }
    }
    return themeOptions[0];
  });

  const handleThemeChange = (selectedOption: any) => {
    setCurrentTheme(selectedOption);
    setSavedTheme(selectedOption.value);
  };

  const handleLanguageChange = (selectedOption: any) => {
    setLanguage(selectedOption);
    setCurrentLanguage(selectedOption.value);
  };

  const [language, setLanguage] = useState(() => {
    for (let i = 0; i < languageOptions.length; i++) {
      if (languageOptions[i].value === currentLanguage) {
        return languageOptions[i];
      }
    }
    return languageOptions[0];
  });

  const selectStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor: '#1a1f2c',
      borderColor: '#424754',
      color: '#dee2f4',
      minHeight: '22px',
      height: '22px',
      fontSize: '12px',
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
    }),
    singleValue: (base: any) => ({
      ...base,
      color: '#dee2f4',
      margin: 0,
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: '#252a37',
      zIndex: 50
    }),
    menuPortal: (base: any) => ({
      ...base,
      zIndex: 9999
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused ? '#303442' : '#252a37',
      color: '#dee2f4',
      padding: '4px 8px',
      fontSize: '12px',
    })
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="bg-surface-container-highest px-3 py-0.5 flex items-center justify-between border-b border-outline-variant/30 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-on-surface font-medium text-xs">
            <span className="material-symbols-outlined !text-[14px] text-primary">code</span>
            Playground
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-24">
            <Select
              options={languageOptions}
              value={language}
              onChange={handleLanguageChange}
              styles={selectStyles}
              menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
            />
          </div>
          <div className="w-32">
            <Select
              options={themeOptions}
              value={currentTheme}
              onChange={handleThemeChange}
              styles={selectStyles}
              menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
            />
          </div>
          <button
            className="text-[11px] font-medium px-2 py-0.5 rounded border border-outline-variant/50 text-on-surface hover:bg-surface-container-low transition-colors"
            onClick={reset}
          >
            Reset
          </button>
          <button
            className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center p-1 rounded hover:bg-surface-container-low"
            onClick={() => {
              const elem = document.getElementById("playground");
              if (elem) {
                if (document.fullscreenElement) {
                  document.exitFullscreen();
                } else {
                  elem.requestFullscreen();
                }
              }
            }}
            title="Toggle Full Screen"  
          >
            <span className="material-symbols-outlined !text-[14px]">fullscreen</span>
          </button>
        </div>
      </div>

      <div className="flex-grow overflow-hidden relative">
        <CodeEditor
          currentLanguage={currentLanguage}
          currentTheme={currentTheme.value}
          currentCode={currentCode}
          setCurrentCode={setCurrentCode}
        />
      </div>
    </div>
  );
};

export default EditorContainer;
