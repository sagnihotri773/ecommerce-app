'use client';

// import { setLocale } from '@/components/Util/setLocale';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function LanguageSwitcher({ className = false }) {
    const [selectedLocale, setSelectedLocale] = useState('en_US'); // Default locale


    useEffect(() => {
        const value = getLanguageCookie();
        setSelectedLocale(value || 'en_US')
    }, []);

    const handleLocaleChange = (language) => {
        Cookies.set('language', language, { expires: 365, path: '/' });
        window.location.reload();
    };

    const getLanguageCookie = () => {
        return Cookies.get('language') || 'en'; // Default to 'en'
    };


    return (
        <select
            value={selectedLocale}
            className={`block cursor-pointer w-[75px] px-1 py-1 ${className ? 'text-black bg-transparent hover:text-secondary' : 'text-white bg-primary hover:bg-primary '}  rounded-md focus:outline-none`}
            onChange={(e) => handleLocaleChange(e.target.value)}
            aria-label="Select language"
        >
            <option value="en_US">English</option>
            <option value="ar_AR">Arabic</option>
            <option value="fr_FR">French</option>
        </select>
    );
}
