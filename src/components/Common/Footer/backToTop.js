'use client'
import React, { useEffect, useState } from 'react'
import smoothscroll from 'smoothscroll-polyfill';

export default function backToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Polyfill for smooth scroll behavior
        smoothscroll.polyfill();

        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        isVisible && (
            <button
                onClick={scrollToTop}
                className="back-to-top flex fixed text-lg z-10 bottom-5 end-5 size-9 m-auto text-center bg-black hover:bg-secondary text-white justify-center items-center animate-bounce"
            >
                <svg width="30px" height="30px" viewBox="0 0 20.00 20.00" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.24"></g><g id="SVGRepo_iconCarrier"><path d="M11 17V5.414l3.293 3.293a.999.999 0 101.414-1.414l-5-5a.999.999 0 00-1.414 0l-5 5a.997.997 0 000 1.414.999.999 0 001.414 0L9 5.414V17a1 1 0 102 0z" fill="white"></path></g></svg>
            </button>
        )
    )
}
