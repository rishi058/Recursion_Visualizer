import React from 'react'
import Image from 'next/image'
import example1 from '../../../../public/example1.png'
import example2 from '../../../../public/example2.png'

function Example() {
  return (
    <>
      <div className="flex justify-center items-center pt-20">
        <div className="w-1/2 border-4 border-gray-700 p-4 text-center rounded-md">
          <p className="text-lg font-bold text-gray-700">EXAMPLE</p>
        </div>
      </div>
      <div className="flex justify-center py-10">
        <Image src={example1} alt="Example" className="w-[80%] lg:w-[60%] rounded-lg" />
      </div>
      <div className="flex justify-center py-10">
        <Image src={example2} alt="Example" className="w-[80%] lg:w-[60%] rounded-lg" />
      </div>
    </>
  )
}

export default Example
