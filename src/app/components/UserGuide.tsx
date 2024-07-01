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
      <div className="px-20 lg:px-40  pt-16 text-xl font-medium  bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-black">
        <p>
          <span className="font-semibold text-gray-400">Step 0 :</span>
          <br /> Paste your recursive code into the IDE below. Make the
          following changes to your recursive code.
        </p>
        <br />
        <p className="italic">
          Note: Do not modify any of the already written code. If any of your
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
        </p>
        <br />
        <p className="italic">
          Note: Do not make the size of the string node very large, as it will
          affect the appearance of the tree. Insert large intermediate values by
          following Step 2.
        
          Then Insert this :{" "}
          <span className="bg-slate-500 text-white">
            int currentId = addNode(node); addEdge(par,currentId);
          </span>
          <br />
          In the recursive call, pass currentId for the parent parameter.
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
          <br />
          <br />
          <span className="italic">
            Note : Right now, only C++ is supported. I will soon add support for other languages. This can be a slow process because at each step we are using to_string() function.
            If the online IDE is not wroking, copy the boiler-plate code, follow the given steps, paste the generated output here and click on Visualize.
            Consider increasing the time-limit & stack-limit of your local compiler if output is not generated.
          </span>
        </p>
      </div>
    </>
  );
}

export default UserGuide;
