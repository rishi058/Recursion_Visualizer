"use client";

import React, { useEffect, useState } from "react";
import EditorContainer from "./EditorContainer";
import { languageMapData } from "../../helper/LanguageMap";
import { postSubmission, getOutput } from "../../api/ideServices";
import InputConsole from "./InputConsole";
import OutputConsole from "./OutputConsole";
import { setGeneratedOutput } from "../../helper/output";
import { getSavedCode, setSavedCode } from "@/app/helper/localStorage";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function IDE() {
  const router = useRouter();

  function navigateToVisual() {
    if (currentOutput == "") {
      return toast.error(
        "Please run the code first or paste something is output"
      );
    }
    router.push("/visual");
  }

  const [currentLanguage, setCurrentLanguage] = useState("cpp");
  const [currentCode, setCurrentCode] = useState(
    languageMapData["cpp"].defaultCode
  );
  const [currentInput, setCurrentInput] = useState("");
  const [currentOutput, setCurrentOutput] = useState("");

  function reset(){
    setCurrentCode(languageMapData[currentLanguage].defaultCode);
    setSavedCode("");
  }

  useEffect(() => {
    let oldCode = getSavedCode();
    if (oldCode == "" || oldCode == null || oldCode == undefined) {
      return;
    }
    setCurrentCode(oldCode);
  }, []);

  const encode = (str: string): string => {
    return Buffer.from(str, "binary").toString("base64");
  };

  const decode = (str: string): string => {
    return Buffer.from(str, "base64").toString();
  };

  const runCode = async () => {
    // save the code, only saved until page is refreshed
    setSavedCode(currentCode);

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

    // update the output
    setGeneratedOutput(final_output);
    setCurrentOutput(final_output);
  };

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
      <div className="h-40"></div>
    </>
  );
}

export default IDE;
