import React, { useContext, useState } from "react";
import CodeEditor from "./CodeEditor";
import styled from "styled-components";
import Select from "react-select";
import { languageMapData } from "./LanguageMap";
import Link from "next/link";

const StyledEditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 80vh;
`;

const UpperToolBar = styled.div`
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
  padding: 0.8rem 0.4rem;

  @media (max-width: 540px) {
    height: 8rem;
  }
`;
const SelectBars = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  & > div {
    width: 8rem;
  }

  & > div:last-child {
    width: 10rem;
  }
`;

const CodeEditorContainer = styled.div`
  height: 100vh;
  & > div {
    height: 110%;
  }
`;
const EditorContainer = ({
  currentLanguage,
  setCurrentLanguage,
  currentCode,
  setCurrentCode,
  runCode,
}: {
  currentLanguage: string;
  setCurrentLanguage: (language: string) => void;
  currentCode: string;
  setCurrentCode: (code: string) => void;
  runCode: () => void;
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

  const handleThemeChange = (selectedOption: any) => {
    setCurrentTheme(selectedOption);
  };

  const handleLanguageChange = (selectedOption: any) => {
    setLanguage(selectedOption);
    setCurrentLanguage(selectedOption.value);
    setCurrentCode(languageMapData[selectedOption.value].defaultCode);
  };

  const [currentTheme, setCurrentTheme] = useState({
    value: "githubDark",
    label: "githubDark",
  });
  const [language, setLanguage] = useState(() => {
    for (let i = 0; i < languageOptions.length; i++) {
      if (languageOptions[i].value === currentLanguage) {
        return languageOptions[i];
      }
    }
    return languageOptions[0];
  });

  return (
    <StyledEditorContainer>
      <UpperToolBar>
        <SelectBars>
          <Select
            options={languageOptions}
            value={language}
            onChange={handleLanguageChange}
          />
          <Select
            options={themeOptions}
            value={currentTheme}
            onChange={handleThemeChange}
          />
        </SelectBars>
      </UpperToolBar>

      <CodeEditorContainer>
        <CodeEditor
          currentLanguage={currentLanguage}
          currentTheme={currentTheme.value}
          currentCode={currentCode}
          setCurrentCode={setCurrentCode}
        />
      </CodeEditorContainer>
      <div className="flex mt-4">
        <button
          className="font-semibold rounded-lg bg-black text-white w-40 h-10 hover:bg-white hover:text-black hover:border-black hover:border-4"
          onClick={runCode}
        >
          Run Code
        </button>
        <div className="w-10"></div>

        <Link href="/visual">
          <div className="flex justify-center items-center mr-10 font-semibold rounded-lg bg-black text-white w-40 h-10 hover:bg-white hover:text-black hover:border-black hover:border-4">
            Visualize
          </div>
        </Link>
      </div>
    </StyledEditorContainer>
  );
};

export default EditorContainer;
