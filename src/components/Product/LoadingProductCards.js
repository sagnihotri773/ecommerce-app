import React from 'react'

export default function LoadingProductCards() {
  return (
    [1, 2, 3, 4].map((x, i) => (
      <div className="" key={i}>
        <div className="h-full border-2 border-gray-200 rounded-lg overflow-hidden">
          <div className="lg:h-80 bg-gray-300 animate-pulse md:h-50 w-full object-cover object-center" />
          <div className="p-6">
            <p className="leading-relaxed mb-3 w-full h-3 animate-pulse bg-gray-400" />
            <div className="flex items-center flex-wrap ">
              <a className="bg-gray-400 h-4 animate-pulse mt-2 w-32 inline-flex items-center md:mb-2 lg:mb-0"></a>
              <span className="bg-gray-400 w-16 mt-2 h-4 animate-pulse mr-3 px-2 inline-flex items-center ml-auto leading-none text-sm pr-5 py-1"></span>
            </div>
          </div>
        </div>
      </div>
    ))
  )
}
