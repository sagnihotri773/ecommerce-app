import React from 'react'

const className="size-6 rounded-full ring-2 ring-gray-200 dark:ring-slate-800 inline-flex align-middle cursor-pointer";
export default function ProductColor({data}) {
    return (
        <div className="flex items-center">
            <div className="space-x-2">
                {data?.length > 0 ? data?.map((val, i) => (
                      <span className={className} key={i} style={{background: val.label.toLowerCase()}} > </span>
                )) : ''}
            </div>
        </div>
    )
}
