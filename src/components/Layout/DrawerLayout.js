import React from 'react'
import { UserModelCloseSvg } from '../SvgFiles/SvgFile'

export default function DrawerLayout({ children, setShowUserModel, closeSidebar }) {
    return (
        <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true"></div>
            <div
                className="fixed  inset-0 h-screen bg-black/30 w-full"
                aria-hidden="true"
                onClick={closeSidebar}
            ></div>
            <div className="fixed inset-0 overflow-hidden" >
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <div className="pointer-events-auto w-screen md:max-w-md">
                            <div className="flex h-screen flex-col overflow-y-auto bg-white z-10">
                                <div className="relative flex-1">
                                    <div className="flex items-start justify-end px-4 py-6 sm:px-6">
                                        <button
                                            type="button"
                                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                            onClick={() => setShowUserModel(false)}
                                        >
                                            <span className="absolute -inset-0.5"></span>
                                            <span className="sr-only">Close panel</span>
                                            <UserModelCloseSvg/>
                                        </button>
                                    </div>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
