"use client";

import React, { useState } from "react";
import EditorContainer from "./EditorContainer";
import { languageMapData } from "./LanguageMap";
import { postSubmission, getOutput } from "../../api/ideServices";
import InputConsole from "./InputConsole";
import OutputConsole from "./OutputConsole";
import { setGeneratedOutput } from "../../../../public/output";

function IDE() {

  const [currentLanguage, setCurrentLanguage] = useState("cpp");
  const [currentCode, setCurrentCode] = useState(languageMapData["cpp"].defaultCode);
  const [currentInput, setCurrentInput] = useState("");
  const [currentOutput, setCurrentOutput] = useState("");

  const encode = (str: string): string => {
    return Buffer.from(str, "binary").toString("base64");
  };

  const decode = (str: string): string => {
    return Buffer.from(str, "base64").toString();
  };

  const runCode = async () => {
    const language_id = languageMapData[currentLanguage].id;
    const source_code = encode(currentCode);
    const stdin = encode(currentInput);

    // pass these things to Create Submissions
    const token = await postSubmission(language_id, source_code, stdin);
    console.log(token);
    // get the output
    const res = await getOutput(token);
    const decoded_output = decode(res.stdout ? res.stdout : "");
    const decoded_compile_output = decode(
      res.compile_output ? res.compile_output : ""
    );
    const decoded_error = decode(res.stderr ? res.stderr : "");

    let final_output = "";
    if (res.status_id !== 3) {
      // our code have some error
      if (decoded_compile_output === "") {
        final_output = decoded_error;
      } else {
        final_output = decoded_compile_output;
      }
    } else {
      final_output = decoded_output;
    }
    setGeneratedOutput(final_output);
    setCurrentOutput(final_output);
  };

  return (
    <>
      <div className="flex justify-center items-center py-10">
        <div className="w-1/2 border-4 border-gray-700 p-4 text-center rounded-md">
          <p className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-black to-white">START EXPERIMENTING</p>
        </div>
      </div>
      <div className="px-10 lg:px-40">
        <EditorContainer
          currentLanguage={currentLanguage}
          setCurrentLanguage={setCurrentLanguage}
          currentCode={currentCode}
          setCurrentCode={setCurrentCode}
          runCode={runCode}
        />
        <InputConsole
          currentInput={currentInput}
          setCurrentInput={setCurrentInput}
        />
        <OutputConsole currentOutput={currentOutput} setCurrentOutput={setCurrentOutput}/>
      </div>
      <div className="h-40"></div>
    </>
  );
}

export default IDE;
