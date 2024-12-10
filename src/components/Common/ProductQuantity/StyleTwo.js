import { MinusSvg, PlusSvg } from '@/components/SvgFiles/SvgFile';
import { useTranslations } from 'next-intl'
import React, { useEffect } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa6';

export default function ProductQuantityStyleTwo({ increaseCount, decreaseCount, count, setQuantity, hideTitle= true }) {
    const t = useTranslations("ProductDetail")
    useEffect(() => {
        if (setQuantity) {
            setQuantity(count);
        }
    }, [count, setQuantity]);

    const handleInputChange = (e) => {
        const newQuantity = Math.max(1, Number(e.target.value));
        setQuantity(newQuantity);
    };
    return (
        <>
          {hideTitle && (<p className='text-[#111111] font-semibold text-base'>Quantity: </p>)}
            <div className="flex items-center">
                <div className="flex items-center border-2 border-[#e3e3e3] ">
                    <button
                        className="px-5 text-gray-600 hover:text-gray-800 focus:outline-none "
                        onClick={(e) => decreaseCount()}
                    >
                        <span id="button-label" class="sr-only">Minus</span>
                        {/* <FaMinus /> */}
                        <MinusSvg/>
                    </button>
                    <label htmlFor="count" className="sr-only">
                        Update Quantity
                    </label>
                    <input
                        min={1}
                        name="count"
                        type="number"
                        value={count}
                        aria-label='update Quantity'
                        className="w-12 text-center text-gray-800 focus:outline-none "
                        onChange={handleInputChange}
                        style={{
                            WebkitAppearance: 'none', // For Webkit browsers (Chrome, Safari)
                            appearance: 'none', // Ensures it works for Chrome as well
                            MozAppearance: 'textfield', // For Firefox
                            margin: 0,
                        }}
                    />
                    <button
                        className="px-5 py-[18px] text-gray-600 hover:text-gray-800 focus:outline-none"
                        onClick={(e) => increaseCount()}
                    > <span id="button-label" class="sr-only">Plus</span>
                        <PlusSvg/>
                    </button>
                </div>
            </div>
        </>
    )
}