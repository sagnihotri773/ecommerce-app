"use client";
import React, { useEffect } from "react";
import { addKeyListener } from "../Util/commonFunctions";
import { CloseDrawerModel } from "../SvgFiles/SvgFile";

export default function PopoverLayout({ openLayout, children, closeLayout }) {
    useEffect(() => {
        // Adds the key listener once, and cleans it up on component unmount
        const cleanup = addKeyListener(() => closeLayout(0));
        return cleanup; // Cleanup on unmount
    }, [closeLayout]);

    return (
        <div
            id="search-model"
            className={`fixed top-0 right-0 z-50 w-full h-screen bg-gray-800 bg-opacity-75 transition-opacity ${openLayout ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            tabIndex="-1"
            aria-labelledby="popover-title"
            style={{ zIndex: "999" }}
        >
            <div className="flex justify-end items-center mt-5 md:mt-[47px] text-[30px] pr-[5%] relative z-[99]">
                <button
                    type="button"
                    className="text-white hover:text-gray-700"
                    aria-label="Close"
                    onClick={() => closeLayout(0)}
                >
                    <CloseDrawerModel/>
                </button>
            </div>
            {children}
        </div>
    );
}
