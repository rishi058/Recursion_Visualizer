import React from 'react'
import Image from 'next/image'
import example1 from '../../../../public/example1.png'
import example2 from '../../../../public/example2.png'

function Example() {
  return (
    <section className="flex flex-col gap-8 min-h-screen pt-24 px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto snap-start justify-center" id="examples">
      <div className="flex flex-col gap-2">
        <h3 className="text-headline-md font-headline-md text-on-surface flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">visibility</span>
          Example
        </h3>
        <p className="text-body-md font-body-md text-on-surface-variant">Here is a example of how to setup your cpp recursion code and how generated trees are like.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        <div className="bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 md:p-6 relative overflow-hidden group hover:border-primary/50 hover:shadow-[0_0_15px] hover:shadow-primary/20 hover:scale-[1.02] transition-all duration-300 shadow-lg flex items-center justify-center z-10 hover:z-20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors"></div>
          <Image src={example1} alt="Example 1" className="w-full h-auto rounded-lg shadow-md border border-outline-variant/20" />
        </div>
        <div className="bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 md:p-6 relative overflow-hidden group hover:border-tertiary/50 hover:shadow-[0_0_15px] hover:shadow-tertiary/20 hover:scale-[1.02] transition-all duration-300 shadow-lg flex items-center justify-center z-10 hover:z-20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/5 rounded-bl-full -z-10 group-hover:bg-tertiary/10 transition-colors"></div>
          <Image src={example2} alt="Example 2" className="w-full h-auto rounded-lg shadow-md border border-outline-variant/20" />
        </div>
      </div>
    </section>
  )
}

export default Example
