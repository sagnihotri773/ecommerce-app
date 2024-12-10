import React from 'react';

export default function ProductSizeStyleTwo({ data, onClickFunction, selectedFilters }) {

    const getClassName = (value) => {
        return `size-9 tracking-wide ${selectedFilters === value ? `text-primary` :'text-gray-400'} text-base rounded-md cursor-pointer w-auto text-gray-400 hover:text-primary transition-all duration-300  py-2`;
    };

    return (
        <div className="flex flex-wrap gap-3 items-center">
            {data?.options?.length > 0 ? data.options.map((option, i) => (
                <p
                    className={getClassName(option.value)}
                    key={i}
                    onClick={() => onClickFunction(data.attribute_code, option.value)}
                >
                    {option.label}
                </p>
            )) : ''}
        </div>
    );
}
