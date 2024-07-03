"use client";

import React, { use, useEffect, useState } from "react";
import EditorContainer from "./EditorContainer";
import { languageMapData } from "../../../helper/LanguageMap";
import { postSubmission, getOutput } from "../../../api/ideServices";
import InputConsole from "./InputConsole";
import OutputConsole from "./OutputConsole";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useLocalStorageState from "../../../hooks/localStorage";

function IDE() {
  //---------------------------------------------------------------------------------

  const router = useRouter();

  function navigateToVisual() {
    if (currentOutput == "") {
      return toast.error(
        "Please run the code first or paste something is output"
      );
    }
    router.push("/visual");
  }

  //---------------------------------------------------------------------------------

  // Local Storage Hooks
  const [savedCode0, setSavedCode0] = useLocalStorageState("cpp", languageMapData["cpp"].defaultCode);
  const [savedCode1, setSavedCode1] = useLocalStorageState("java", languageMapData["java"].defaultCode);
  const [savedCode2, setSavedCode2] = useLocalStorageState("python", languageMapData["python"].defaultCode);
  const [savedCode3, setSavedCode3] = useLocalStorageState("javascript", languageMapData["javascript"].defaultCode);

  const [savedInput, setSavedInput] = useLocalStorageState("input", "");
  const [savedOutput, setSavedOutput] = useLocalStorageState("output", "");

  function reset() {
    setCurrentCode(languageMapData[currentLanguage].defaultCode);
    if(currentLanguage === "cpp") setSavedCode0("");
    if(currentLanguage === "java") setSavedCode1("");
    if(currentLanguage === "python")  setSavedCode2("");
    if(currentLanguage === "javascript")setSavedCode3("");
  }


  // IDE Hooks
  const [currentLanguage, setCurrentLanguage] = useState("cpp");
  const [currentCode, setCurrentCode] = useState(savedCode0);
  const [currentInput, setCurrentInput] = useState(savedInput);
  const [currentOutput, setCurrentOutput] = useState(savedOutput);

  useEffect(() => { 
    // saving code after every keyboard stroke.
    if(currentLanguage === "cpp") setSavedCode0(currentCode);
    if(currentLanguage === "java") setSavedCode1(currentCode);
    if(currentLanguage === "python")  setSavedCode2(currentCode);
    if(currentLanguage === "javascript")setSavedCode3(currentCode);
  },[currentCode]);

  useEffect(() => {
    // If saved code is present, then load it.
    if(currentLanguage === "cpp") setCurrentCode(savedCode0);
    if(currentLanguage === "java") setCurrentCode(savedCode1);
    if(currentLanguage === "python") setCurrentCode(savedCode2);
    if(currentLanguage === "javascript") setCurrentCode(savedCode3);
  },[currentLanguage]);

  useEffect(() => {
    // saving input after every keyboard stroke.
    setSavedInput(currentInput);
  },[currentInput, setSavedInput]);

  useEffect(() => {
    // saving output after every keyboard stroke.
    setSavedOutput(currentOutput);
  },[currentOutput, setSavedOutput]);

  //------------------------------------------------------------------------------------
  

  const encode = (str: string): string => {
    return Buffer.from(str, "binary").toString("base64");
  };

  const decode = (str: string): string => {
    return Buffer.from(str, "base64").toString();
  };

  //------------------------------------------------------------------------------------

  const [isRunning, setIsRunning] = useState(false);

  const runCode = async () => {
    setIsRunning(true);
    const language_id = languageMapData[currentLanguage].id;
    const source_code = encode(currentCode);
    const stdin = encode(currentInput);

    const token = await postSubmission(language_id, source_code, stdin);

    if (!token) {
      toast.error("Failed to create submission.");
      return;
    }

    const res = await getOutput(token);

    if (!res) {
      toast.error("Failed to retrieve output.");
      return;
    }

    const decoded_output = decode(res && res.stdout ? res.stdout : "");
    const decoded_compile_output = decode(
      res && res.compile_output ? res.compile_output : ""
    );
    const decoded_error = decode(res && res.stderr ? res.stderr : "");

    let final_output = "";
    if (res.status_id !== 3) {
      // Code has some error
      if (decoded_compile_output === "") {
        final_output = decoded_error;
      } else {
        final_output = decoded_compile_output;
      }
    } else {
      final_output = decoded_output;
    }

    toast.success("Time taken to execute: " + res.time + "s");

    // save the output in local storage
    setSavedOutput(final_output);
    // update the output of the UI
    setCurrentOutput(final_output);
    // updating the sate of the Run Button
    setIsRunning(false);
  };


  //---------------------------------------------------------------------------------

  return (
    <>
      <div className="flex justify-center items-center py-10">
        <div className="w-1/2 border-4 border-gray-700 p-4 text-center rounded-md">
          <p className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-black to-white">
            START EXPERIMENTING
          </p>
        </div>
      </div>
      <div className="px-10 lg:px-40">
        <EditorContainer
          currentLanguage={currentLanguage}
          setCurrentLanguage={setCurrentLanguage}
          currentCode={currentCode}
          setCurrentCode={setCurrentCode}
          runCode={runCode}
          navigateToVisual={navigateToVisual}
          reset={reset}
          isRunning={isRunning}
        />
        <InputConsole
          currentInput={currentInput}
          setCurrentInput={setCurrentInput}
        />
        <OutputConsole
          currentOutput={currentOutput}
          setCurrentOutput={setCurrentOutput}
        />
      </div>
      <div className="h-20"></div>
    </>
  );
}

export default IDE;
