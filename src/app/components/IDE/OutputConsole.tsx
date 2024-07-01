import React from "react";
import { Header, TextArea } from "./InputConsole";
import { setGeneratedOutput } from "@/app/helper/output";

const OutputConsole = ({ currentOutput, setCurrentOutput}: any) => {

  function handleOutputChange(e: any) {
    setCurrentOutput(e);
    setGeneratedOutput(e);
  }

  return (
    <div className="flex flex-col mt-5 border-black border-4 rounded-lg lg:mx-40">
      <Header>Output:</Header>
      <TextArea value={currentOutput} onChange={(e) => handleOutputChange(e.target.value)}/>
    </div>
  );
};

export default OutputConsole;
