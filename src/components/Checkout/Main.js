"use client"
import React from 'react';
import CartSummary from './CartSummary';
import CustomerCheckOut from './Customer';

export default function Main() {
    return (
        <div className="container m-auto relative">
            <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 gap-6">
                <div className="lg:col-span-8">
                    <div className="p-6 rounded-md shadow dark:shadow-gray-800">
                        <CustomerCheckOut />
                    </div>
                </div>
                <div className="lg:col-span-4">
                    <CartSummary />
                </div>
            </div>
        </div>
    )
}
