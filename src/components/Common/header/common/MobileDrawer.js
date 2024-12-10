"use client"
import React, { useState } from 'react'
import { X } from 'lucide-react';
import dynamic from 'next/dynamic';
const MobileMenu = dynamic(() => import('@/components/Common/header/MobileMenu').then((mod) => mod.default), { ssr: true });
const Customer = dynamic(() => import('@/components/Common/header/common/customer').then((mod) => mod.default), { ssr: true });
const CurrencyStore = dynamic(() => import('@/components/Common/header/common/CurrencyStore').then((mod) => mod.default), { ssr: true });
const LanguageSwitcher = dynamic(() => import('@/components/Common/header/common/LanguageSwitcher').then((mod) => mod.default), { ssr: true });


export default function MobileDrawer({ navBarOptions, isOpen, setIsOpen }) {
    const [activeTab, setActiveTab] = useState('menu');

    const sideBarOptions = [
        { title: 'Menu', value: 'menu' },
        { title: 'Account', value: 'account' },
        { title: 'Setting', value: 'setting' }

    ]

    const settingTabOption = [
        { name: 'Language', url_path: '/' },
        { name: 'Pearl Fashion V3', url_path: '/' }
    ]

    const toggleTab = (tab) => {
        setActiveTab(tab)
    }

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div className={`fixed inset-0 z-40 ${isOpen ? 'block' : 'hidden'}`} onClick={toggleSidebar} >
            <div className={`fixed top-0 left-0 w-80 h-screen bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} onClick={(e) => e.stopPropagation()} >
                <div className="bg-[#f7f7f7] flex  items-center bg-white border-b">
                    {sideBarOptions?.map((val, i) => (
                        <button
                        key={i}
                            onClick={() => toggleTab(val.value)}
                            type='button'
                            className={`flex items-center space-x-2 focus:outline-none p-4 ${activeTab == val.value ? 'bg-white' : 'bg-[#f7f7f7]'}`}
                        >
                            <span>{val.title}</span>
                        </button>
                    ))}
                    <button onClick={toggleSidebar} className="p-2 flex w-[100%] justify-end" aria-label="Close menu">
                        <X size={24} />
                    </button>
                </div>
                <div className='max-h-screen overflow-y-auto pb-20'>
                    {activeTab === 'menu' ? navBarOptions.map((item, index) => (
                        <MobileMenu key={index} item={item} isOpen={isOpen} setIsOpen={setIsOpen} closeDrawer={toggleSidebar} />
                    )) : activeTab === 'account' ?
                        <Customer /> :
                        activeTab === 'setting' ? 
                        <div className='inset-2 relative'>
                            Coming Soon
                        </div> : ""}
                    {/* <div className='flex gap-2 justify-center h-[27px]'>
                        <CurrencyStore isScrolled={false} />
                    </div> */}
                    <div className="flex gap-2 justify-center h-[27px] fixed mt-4 mb-16 w-full ">
                        <CurrencyStore isScrolled={false} />
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>
        </div>
    )
}
