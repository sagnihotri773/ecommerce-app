'use client'
import React from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { selectStoreInfo } from '@/lib/redux/slices/storeConfig'
import { StoreLogo } from '../../StoreLogo/StoreLogo'
import { MenuSvg } from '@/components/SvgFiles/SvgFile'

export default function LogoComponent({
    children,
    toggleSidebar,
    className = "",
    isLoading = false,
    logCss = ''
}) {
    const storeLogoUrl = useSelector((state) => selectStoreInfo(state, "logo"));
    return (
        <div className={classNames("container m-auto  flex", className)}>
            

<div className="text-3xl mt-1 mr-2 block md:hidden cursor-pointer"
                onClick={toggleSidebar}>
                <MenuSvg />
            </div>
            {/* Logo Section */}
            <div className={`relative ${logCss}`}>
                {!isLoading ? (
                     <StoreLogo/>
                ) : (
                    <div className="w-36 h-12 bg-gray-300 animate-pulse rounded-lg" />
                )}
            </div>

            {/* Additional children elements */}
            <div>{children}</div>
        </div>
    )
}
