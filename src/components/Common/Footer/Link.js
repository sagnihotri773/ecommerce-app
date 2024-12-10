'use client'
import Link from 'next/link'
import React from 'react'

export default function footerLink({ data }) {

    const chunkArray = (arr, size) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, size + i));
        }
        return result;
    };
    const chunkedArray = chunkArray(data, 6);
    return (
        <>
            {chunkedArray?.length ? chunkedArray.map((chunk, chunkIndex) => (
                <div key={chunkIndex} className="md:col-span-4">
                    <ul className="list-none footer-list mt-6">
                        {chunk.map((item, index) => (
                            <li key={index} className="ms-0 mt-[10px]">
                                <Link href={item.link} className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out">
                                    <i className="mdi mdi-chevron-right" /> {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )) : ''}
        </>
    )
}
