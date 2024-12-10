import { useTranslations } from 'next-intl'
import React, { useState, useEffect } from 'react'

export default function ProductQuantity({ increaseCount, decreaseCount, count,setQuantity="" }) {
    const t = useTranslations("ProductDetail")
   

    
    useEffect(() => {
        if (setQuantity) {
            setQuantity(count);
        }
    }, [count,setQuantity]);

    const handleInputChange = (e) => {
        const newQuantity = Math.max(1, Number(e.target.value)); 
        
        setQuantity(newQuantity);
        
    };

   
    

    return (
        <div className="flex items-center">
            <h5 className="text-lg font-semibold me-2">{t("Quantity:")}</h5>
            <div className="qty-icons ms-3 space-x-0.5">
                <button
                    className="size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-orange-500/5 hover:bg-primary text-primary hover:text-white minus"
                    onClick={decreaseCount}
                >
                    -
                </button>
                
                <input
                    min={1}
                    name="count"
                    type="number"
                    value={count}
                    className="h-9 inline-flex focus:outline-none items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-orange-500/5  text-primary  w-16  count"
                    onChange={handleInputChange}
                />
                <button
                    className="size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-orange-500/5 hover:bg-primary text-primary hover:text-white plus"
                    onClick={increaseCount}
                >
                    +
                </button>
            </div>
        </div>
    );
}
