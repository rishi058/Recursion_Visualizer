import React from 'react'

const InputConsole = ({ currentInput, setCurrentInput }: any) => {
  return (
    <div className='flex flex-col h-full'>
      <div className='bg-surface-container-highest px-4 py-1 border-b border-outline-variant/30 flex items-center justify-between'>
        <span className="text-label-sm font-label-sm text-on-surface-variant flex items-center gap-2">
           <span className="material-symbols-outlined text-[16px]">keyboard</span>
           Input
        </span>
      </div>
      <textarea
        className="flex-grow resize-none bg-surface-container text-on-surface p-4 font-mono text-code-md outline-none focus:ring-1 focus:ring-primary/50"
        onChange={(e) => setCurrentInput(e.target.value)}
        value={currentInput}
        placeholder="Enter input here..."
      />
    </div>
  )
}

export default InputConsole