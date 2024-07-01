import React from "react";
import { Header, TextArea } from "./InputConsole";

const OutputConsole = ({ currentOutput, setCurrentOutput}: any) => {
  return (
    <div className="flex flex-col mt-5 border-black border-4 rounded-lg lg:mx-40">
      <Header>Output:</Header>
      <TextArea value={currentOutput} onChange={(e) => setCurrentOutput(e.target.value)}/>
    </div>
  );
};

export default OutputConsole;
