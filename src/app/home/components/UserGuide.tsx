import React from "react";

function UserGuide() {
  return (
    <>
      <div className="flex justify-center items-center pt-20">
        <div className="w-1/2 border-4 border-gray-700 p-4 text-center rounded-md">
          <p className="text-lg font-bold text-gray-400">
            HOW TO USE IT?
          </p>
        </div>
      </div>
      <div className="mx-15 lg:mx-40 font-medium mt-16 p-5 text-xl text-gray-400 bg-gradient-to-r from-gray-900 to-gray-700">
        <br />
        <p>
          <span className="font-semibold text-gray-400">Step 0 :</span>
          <br /> Paste your recursive code into the IDE below. Make the
          following changes to your recursive code.
        </p>
        <br />
        <p className="italic">
          <span className="font-bold">Note: </span> 
          Do not modify any of the already written code. If any of your
          variable names collide with the boilerplate, please modify your code
          accordingly.
        </p>
        <br />
        <p>
          <span className="font-semibold text-gray-400">Step 1 :</span>
          <br />
          Add one extra parameter(par) to your recursive function that will keep
          track of the parent node and will be used to build the tree.
          <br />
          Just after entering the recursive function, create a string named node
          which includes the function name and the values of the parameters you
          want to see in the node.
          <br /> <br />
          Then Insert this :{" "}
          <span className="bg-slate-500 text-white">
            int currentId = addNode(node); addEdge(par,currentId);
          </span>
          <br />
          In the recursive call, pass currentId for the parent parameter.
        </p>
        <br />
        <p className="italic">
        <span className="font-bold">Note:</span> Do not make the size of the string node very large, as it will
          affect the appearance of the tree. Insert large intermediate values by
          following Step 2. This data can be viewed by hovering over the node.
        </p>
        <br />
        <p className="">
          <span className="font-semibold text-gray-400">Step 2 :</span>
          <br />
          If your function has a return value and you want to include it in the
          visualization, then before returning the value, store it as:
          <br />
          <span className="bg-slate-500 text-white">
            nodeToAns[currentId] = to_string(return_value);
          </span>
          <br /> <br />
          At last run the code by giving input(if any), a output will be generated after that click on Visualize button.
          <br />
          <br />
          <span className="italic">
            <span className="font-bold">Note : </span><br />
            1. Right now, only C++ is supported. I will soon add support for other languages.
            <br /> <br />
            2. The visualization can be a slow process because at each step we are using to_string() function.
            <br /> <br />
            3. If the online IDE is not wroking, copy the boiler-plate in any other IDE & modify the code.
            Generate and paste the output here and click on Visualize. <br /> <br />
            4. Consider increasing the time-limit & stack-limit of compiler you are using if output is not generated. <br /> <br />
            5. Dont add &quot;/n&quot; when coverting data to string. It will break the JSON. You can only use &quot;//n&quot; or the defined macro br(in C++) for a new line in strings. <br /> <br />
            6. You can use pre-defined functions like getVectorToString, get2DVectorToString to convert vectors to string. <br /> <br />
          </span>
        </p>
      </div>
    </>
  );
}

export default UserGuide;
