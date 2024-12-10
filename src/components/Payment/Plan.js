import React from 'react'
import SubmitButton from '@/components/Util/Button/SubmitButton'

export default function Plan() {
    return (
        <div className="rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
            <div className="p-6 md:flex justify-between items-center border-b border-gray-100 dark:border-gray-700">
                <div className="mb-4 md:mb-0">
                    <h5 className="text-xl font-semibold">Current Plan</h5>
                </div>
                <SubmitButton title={'Switch to Annual Plan'}/>
            </div>
            <div className="p-6">
                <h5 className="text-2xl font-semibold">$18/Monthly</h5>
                <p className="text-slate-400 mt-2">
                    Your next monthly charge of $18 will be applied to your primary payment
                    method on July 20, 2022.
                </p>
            </div>
        </div>
    )
}
