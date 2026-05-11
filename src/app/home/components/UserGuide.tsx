"use client";
import React from "react";
import toast from "react-hot-toast";

function UserGuide() {
  const handleCopyPrompt = async () => {
    try {
      const response = await fetch('/PROMPT.md');
      const text = await response.text();
      await navigator.clipboard.writeText(text);
      toast.success("Prompt copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy prompt");
      console.error(error);
    }
  };

  return (
    <section className="flex flex-col gap-8 min-h-screen py-24 px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto snap-start justify-center" id="how-to-use">
      <div className="flex flex-col gap-2">
        <h3 className="text-headline-md font-headline-md text-on-surface flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">integration_instructions</span>
          How to Use
        </h3>
        <p className="text-body-md font-body-md text-on-surface-variant">Follow these steps to visualize your recursive code.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Step 0 */}
        <div className="bg-surface-container-low border border-outline-variant/30 rounded-xl p-6 flex flex-col gap-4 relative overflow-hidden group hover:border-primary/50 hover:shadow-[0_0_15px] hover:shadow-primary/20 hover:scale-[1.02] transition-all duration-300 z-10 hover:z-20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors"></div>
          <div className="flex items-center gap-3 text-primary">
            <span className="text-label-sm font-label-sm font-bold bg-primary/10 px-2 py-1 rounded">STEP 0</span>
            <h4 className="text-body-lg font-body-lg font-semibold text-on-surface">Prepare IDE</h4>
          </div>
          <p className="text-body-md font-body-md text-on-surface-variant">Code/Paste your recursive program into the IDE below. Make the following changes to your recursive code.</p>
          <div className="mt-auto pt-4 border-t border-outline-variant/20">
            <p className="text-label-sm font-label-sm text-secondary flex gap-2">
              Do not modify any of the already written code.
            </p>
          </div>
        </div>
        
        {/* Step 1 */}
        <div className="bg-surface-container-low border border-outline-variant/30 rounded-xl p-6 flex flex-col gap-4 relative overflow-hidden group hover:border-tertiary/50 hover:shadow-[0_0_15px] hover:shadow-tertiary/20 hover:scale-[1.02] transition-all duration-300 z-10 hover:z-20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/5 rounded-bl-full -z-10 group-hover:bg-tertiary/10 transition-colors"></div>
          <div className="flex items-center gap-3 text-tertiary">
            <span className="text-label-sm font-label-sm font-bold bg-tertiary/10 px-2 py-1 rounded">STEP 1</span>
            <h4 className="text-body-lg font-body-lg font-semibold text-on-surface">Add Parameters</h4>
          </div>
          <p className="text-body-md font-body-md text-on-surface-variant">Add one extra parameter (let say &apos;ok&apos;) to your recursive and give it a default value 0. Just after entering the recursive function, create a string that includes the function name and the values.</p>
          <div className="bg-surface-container p-3 rounded border border-outline-variant/50 font-mono text-code-md mt-2">
            <span className="text-secondary">tv.make(nodeVal, ok);</span>
          </div>
          <p className="text-label-sm font-label-sm text-on-surface-variant mt-2">Don&apos;t forget to pass again the parameter &apos;ok&apos; in the recursive calls.</p>
        </div>
        
        {/* Step 2 */}
        <div className="bg-surface-container-low border border-outline-variant/30 rounded-xl p-6 flex flex-col gap-4 relative overflow-hidden group hover:border-primary/50 hover:shadow-[0_0_15px] hover:shadow-primary/20 hover:scale-[1.02] transition-all duration-300 z-10 hover:z-20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors"></div>
          <div className="flex items-center gap-3 text-primary">
            <span className="text-label-sm font-label-sm font-bold bg-primary/10 px-2 py-1 rounded">STEP 2</span>
            <h4 className="text-body-lg font-body-lg font-semibold text-on-surface">Return Values</h4>
          </div>
          <p className="text-body-md font-body-md text-on-surface-variant">If your function has a return value and you want to include it in the visualization, store it before returning.</p>
          <div className="bg-surface-container p-3 rounded border border-outline-variant/50 font-mono text-code-md mt-2">
            <span className="text-secondary">tv.onHover(string-to-display, ok);</span>
          </div>
          <p className="text-label-sm font-label-sm text-on-surface-variant mt-2">At last run the code by giving input(if any), a output will be generated after that click on Visualize button.</p>
        </div>
      </div>
      
      {/* Notes Panel */}
      <div className="bg-surface-container border border-outline-variant/30 rounded-xl p-6 flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0 flex items-start text-secondary">
          <span className="material-symbols-outlined !text-[24px]">assignment_late</span>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="text-body-lg font-body-lg font-semibold text-on-surface">Important Notes</h4>
          <ul className="text-body-md font-body-md text-on-surface-variant space-y-2 list-disc list-inside marker:text-outline-variant">
            <li>The Code execution may become slow because of the Tree Builder overhead.</li>
            <li>Don&apos;t add &quot;\n&quot; for new lines when coverting data to string. It will break the JSON. Use already defined macro `br` for new line.</li> 
            <li>Use pre-defined functions like getVectorToString, get2DVectorToString to convert arrays to string.</li>
            <li>If the online IDE is not working, copy the boiler-plate in any other IDE &amp; modify it accordingly. Generate the output and paste it in Output panel and Visualise</li> 
          </ul>
        </div>
      </div>

      {/* AI Prompt Panel */}
      <div className="bg-surface-container border border-outline-variant/30 rounded-xl p-6 flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0 flex items-start text-primary">
          <span className="material-symbols-outlined !text-[24px]">smart_toy</span>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h4 className="text-body-lg font-body-lg font-semibold text-on-surface">AI Modification Prompt</h4>
            <button 
              onClick={handleCopyPrompt}
              className="text-on-surface-variant hover:text-primary transition-all flex items-center justify-center py-1.5 px-4 rounded-lg hover:bg-surface-container-highest active:scale-95 border border-outline-variant/30 bg-surface-container-low shadow-sm"
              title="Copy Prompt"
            >
              <span className="material-symbols-outlined !text-[18px]">content_copy</span>
              <span className="ml-2 text-sm font-medium">Copy PROMPT.md</span>
            </button>
          </div>
          <p className="text-body-md font-body-md text-on-surface-variant">
            Too lazy to go through these steps manually? <br/>
            Use this PROMPT.md along with your code to let the LLM modify your recursive function accordingly.
          </p>
        </div>
      </div>
    </section> 
  );
}

export default UserGuide;
