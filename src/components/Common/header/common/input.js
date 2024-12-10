import { Search } from 'lucide-react'
import React from 'react'

export default function input({ handleSearchToggle , isScrolled= false , showInput= true}) {
    return (
        <div className="flex items-center space-x-4">
            <div className="relative" onClick={() => handleSearchToggle()}>
                {showInput && (<input
                    type="text"
                    placeholder="Search entire store here..."
                    className={`${isScrolled ? 'placeholder-black' : 'placeholder-white' }  pl-2 pr-8 py-1 border-b border-black border-b-1 rounded-none focus:ring-0 focus:outline-none hidden md:block bg-transparent`}
                />)}
                <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white cursor-pointer" size={20} />
            </div>
        </div>
    )
}
