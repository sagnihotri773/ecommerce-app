"use client"
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'; 

export default function MobileMenu({ item, depth = 0, closeDrawer }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button
                className={`flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left hover:bg-accent hover:text-accent-foreground`}
                style={{ padding: `4px ${8 + depth * 6}px` }}
                onClick={() => item.children && setIsOpen(!isOpen)}
            >
                <Link href={`/${item.url}`} as={`/${item.url}`} prefetch={true} onClick={(e) => closeDrawer()}>
                    {item.name}
                </Link>
                {item.children?.length ? (
                    isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                ) : ''}
            </button>
            {item.children && isOpen && (
                item.children.map((child, index) => (
                    <MobileMenu key={index} item={child} depth={depth + 1} closeDrawer={closeDrawer} />
                ))
            )}
            {/* <div className="flex gap-2 justify-center h-[27px] fixed bottom-2 w-full ">
                <CurrencyStore isScrolled={false} />
            </div> */}
        </>
    );
}
