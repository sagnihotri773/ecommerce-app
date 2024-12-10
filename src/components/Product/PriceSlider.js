import React, { useEffect } from 'react'
import { Slider } from "@/components/ui/slider"
import { useFilter } from '../Util/context/FilterContext';

export default function PriceSlider({ data, selectedFilters = {}, onClickFunction }) {
    const minValue = Math.min(...data?.options?.map(range => parseInt(range.label.split("-")[0])));
    const maxValue = Math.max(...data?.options?.map(range => parseInt(range.label.split("-")[1])));
    const { setPriceRange, priceRange } = useFilter();

    useEffect(() => {
        setPriceRange([minValue,maxValue ])
        return () => {
            setPriceRange([minValue,maxValue ])
        };
    },[])
 
    const handlePriceChange = (code, values, label) => {
        setPriceRange(values)
        onClickFunction(code, values, label);
    };

    return (
        <div className="w-full max-w-md mx-auto h-[60px] cursor-pointer">
            <p className="mb-4 text-sm text-[#444444] hover:text-secondary">
                Selected Price Range: {priceRange[0]} - {priceRange[1]}
            </p>
            <Slider
                defaultValue={[minValue, maxValue]}
                min={minValue}
                max={maxValue}
                step={1} // Step size can be adjusted
                value={priceRange}
                onValueChange={(values) => handlePriceChange(data.attribute_code, values, 'price')}
            />
        </div>
    )
}
