"use client";

import React, { useEffect, useRef, useState } from "react";
import EditorContainer from "./EditorContainer";
import { languageMapData } from "../../../helper/LanguageMap";
import { getDefaultCodes, DefaultCodes } from "../../../helper/getDefaultCodes";
import { postSubmission, getOutput } from "../../../api/ideServices";
import InputConsole from "./InputConsole";
import OutputConsole from "./OutputConsole";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useLocalStorageState from "../../../hooks/localStorage";

const EMPTY_DEFAULTS: DefaultCodes = { cpp: '', java: '', python: '', javascript: '' };

function IDE() {
  const router = useRouter();

  const [defaultCodes, setDefaultCodes] = useState<DefaultCodes>(EMPTY_DEFAULTS);
  const defaultsLoadedRef = useRef(false);

  useEffect(() => {
    getDefaultCodes().then((codes) => {
      setDefaultCodes(codes);
      defaultsLoadedRef.current = true;
      // Seed localStorage for any language slot that is still empty.
      // This handles first-time visitors and stale empty-string entries
      // left over from previous sessions before default codes were loaded.
      if (!savedCode0) setSavedCode0(codes.cpp);
      if (!savedCode1) setSavedCode1(codes.java);
      if (!savedCode2) setSavedCode2(codes.python);
      if (!savedCode3) setSavedCode3(codes.javascript);
      // Also update the active editor if it's currently blank
      setCurrentCode((prev) => {
        if (prev) return prev;
        if (currentLanguage === 'cpp') return codes.cpp;
        if (currentLanguage === 'java') return codes.java;
        if (currentLanguage === 'python') return codes.python;
        if (currentLanguage === 'javascript') return codes.javascript;
        return codes.cpp;
      });
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function navigateToVisual() {
    if (currentOutput == "") {
      return toast.error(
        "Please run the code first or paste something is output"
      );
    }
    // Push /#playground into history so back-button lands there
    window.history.pushState(null, "", "/#playground");
    router.push("/visual");
  }

  // Local Storage Hooks — default codes are loaded from public/sample_codes/ via server action
  const [savedCode0, setSavedCode0] = useLocalStorageState("cpp", defaultCodes.cpp);
  const [savedCode1, setSavedCode1] = useLocalStorageState("java", defaultCodes.java);
  const [savedCode2, setSavedCode2] = useLocalStorageState("python", defaultCodes.python);
  const [savedCode3, setSavedCode3] = useLocalStorageState("javascript", defaultCodes.javascript);

  const [savedInput, setSavedInput] = useLocalStorageState("input", "");
  const [savedOutput, setSavedOutput] = useLocalStorageState("output", "");

  function reset() {
    const defaultCode = defaultCodes[currentLanguage as keyof DefaultCodes];
    setCurrentCode(defaultCode);
    if(currentLanguage === "cpp") setSavedCode0(defaultCode);
    if(currentLanguage === "java") setSavedCode1(defaultCode);
    if(currentLanguage === "python")  setSavedCode2(defaultCode);
    if(currentLanguage === "javascript")setSavedCode3(defaultCode);
  }


  // IDE Hooks
  const [currentLanguage, setCurrentLanguage] = useLocalStorageState("language", "cpp");
  const [currentCode, setCurrentCode] = useState(() => {
    if(currentLanguage === "cpp") return savedCode0;
    if(currentLanguage === "java") return savedCode1;
    if(currentLanguage === "python") return savedCode2;
    if(currentLanguage === "javascript") return savedCode3;
    return savedCode0;
  });
  const [currentInput, setCurrentInput] = useState(savedInput);
  const [currentOutput, setCurrentOutput] = useState(savedOutput);

  const prevLangRef = React.useRef(currentLanguage);

  useEffect(() => {
    if (prevLangRef.current !== currentLanguage) {
      if(currentLanguage === "cpp") setCurrentCode(savedCode0);
      if(currentLanguage === "java") setCurrentCode(savedCode1);
      if(currentLanguage === "python") setCurrentCode(savedCode2);
      if(currentLanguage === "javascript") setCurrentCode(savedCode3);
      prevLangRef.current = currentLanguage;
    } else {
      if(currentLanguage === "cpp") setSavedCode0(currentCode);
      if(currentLanguage === "java") setSavedCode1(currentCode);
      if(currentLanguage === "python") setSavedCode2(currentCode);
      if(currentLanguage === "javascript") setSavedCode3(currentCode);
    }
  }, [currentCode, currentLanguage, savedCode0, savedCode1, savedCode2, savedCode3, setSavedCode0, setSavedCode1, setSavedCode2, setSavedCode3]);

  useEffect(() => {
    setSavedInput(currentInput);
  },[currentInput, setSavedInput]);

  useEffect(() => {
    setSavedOutput(currentOutput);
  },[currentOutput, setSavedOutput]);

  const encode = (str: string): string => {
    return Buffer.from(str, "binary").toString("base64");
  };

  const decode = (str: string): string => {
    return Buffer.from(str, "base64").toString();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Silently remove #playground hash when section scrolls out of view
          if (!entry.isIntersecting && window.location.hash === "#playground") {
            window.history.replaceState(null, "", window.location.pathname);
          }
        });
      },
      { threshold: 0 }
    );

    const el = document.getElementById("playground");
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, []);

  const [isRunning, setIsRunning] = useState(false);

  const runCode = async () => {
    setIsRunning(true);
    const language_id = languageMapData[currentLanguage].id;
    const source_code = encode(currentCode);
    const stdin = encode(currentInput);

    const token = await postSubmission(language_id, source_code, stdin);

    if (!token) {
      toast.error("Failed to create submission.");
      setIsRunning(false);
      return;
    }

    const res = await getOutput(token);

    if (!res) {
      toast.error("Failed to retrieve output.");
      setIsRunning(false);
      return;
    }

    const decoded_output = decode(res && res.stdout ? res.stdout : "");
    const decoded_compile_output = decode(
      res && res.compile_output ? res.compile_output : ""
    );
    const decoded_error = decode(res && res.stderr ? res.stderr : "");

    let final_output = "";
    if (res.status_id !== 3) {
      if (decoded_compile_output === "") {
        final_output = decoded_error;
      } else {
        final_output = decoded_compile_output;
      }
    } else {
      final_output = decoded_output;
    }

    toast.success("Time taken to execute: " + res.time + "s");

    setSavedOutput(final_output);
    setCurrentOutput(final_output);
    setIsRunning(false);
  };

  return (
    <section className="min-h-screen pt-20 px-margin-mobile md:px-margin-desktop w-full max-w-[1600px] mx-auto snap-start flex flex-col gap-4" id="playground">
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 h-[calc(100vh-100px)] mb-8">
        {/* Left Side: Code Editor */}
        <div className="bg-surface-container-low border border-outline-variant/30 rounded-xl flex flex-col overflow-hidden shadow-xl">
          <EditorContainer
            currentLanguage={currentLanguage}
            setCurrentLanguage={setCurrentLanguage}
            currentCode={currentCode}
            setCurrentCode={setCurrentCode}
            reset={reset}
          />
        </div>

        {/* Right Side: Input & Output */}
        <div className="flex flex-col gap-4">
          {/* Action Buttons */}
          <div className="flex justify-end gap-3 h-8 items-center">
            {isRunning ? (
              <div className="flex items-center justify-center w-24 h-7">
                 <span className="material-symbols-outlined animate-spin text-primary !text-[18px]">progress_activity</span>
              </div>
            ) : (
              <button
                className="bg-primary text-on-primary text-xs font-medium px-4 py-1 rounded hover:bg-primary-fixed transition-colors flex items-center gap-2"
                onClick={runCode}
              >
                Run Code
                <span className="material-symbols-outlined !text-[14px]">play_arrow</span>
              </button>
            )}
            <button
              className="bg-tertiary text-on-tertiary text-xs font-medium px-4 py-1 rounded hover:bg-tertiary-fixed transition-colors flex items-center gap-2"
              onClick={navigateToVisual}
            >
              Visualize
              <span className="material-symbols-outlined !text-[14px]">account_tree</span>
            </button>
          </div>

          <div className="flex-1 bg-surface-container-low border border-outline-variant/30 rounded-xl overflow-hidden flex flex-col shadow-xl">
            <InputConsole
              currentInput={currentInput}
              setCurrentInput={setCurrentInput}
            />
          </div>
          <div className="flex-1 bg-surface-container-low border border-outline-variant/30 rounded-xl overflow-hidden flex flex-col shadow-xl">
            <OutputConsole
              currentOutput={currentOutput}
              setCurrentOutput={setCurrentOutput}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default IDE;
