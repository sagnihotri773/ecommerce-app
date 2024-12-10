import React, { useState } from 'react';

export default function ProductSize({ data, onClickFunction, selectedFilters = {} }) {
    const [visibleCount, setVisibleCount] = useState(5); // Default to showing 5 options

    const showMoreOptions = () => {
        setVisibleCount((prevCount) => prevCount + 5); // Increment by 5
    };

    const showLessOptions = () => {
        setVisibleCount(5); // Reset to default
    };

    return (
        <div className="space-y-2">
            {data?.options?.length > 0 ? (
                <>
                    {data.options.slice(0, visibleCount).map((option, i) => (
                        <div className="flex justify-between items-center" key={i}>
                            <button
                                className={`text-sm ${selectedFilters?.value === option.value
                                    ? 'text-[#444444]'
                                    : 'text-[#444444] hover:text-secondary text-base'
                                    }`}
                                onClick={(e) => onClickFunction(data?.attribute_code, option.value, option.label)}
                            >
                                {option.label}
                            </button>
                            <span className="text-gray-900 bg-gray-300 px-2 py-1 text-sm">
                                {option.count}
                            </span>
                        </div>
                    ))}
                    {data.options.length > visibleCount ? (
                        <button
                            onClick={showMoreOptions}
                            className="text-[#444444] text-sm  mt-2"
                        >
                            + Show more
                        </button>
                    ) : (
                        data.options.length > 5 && (
                            <button
                                onClick={showLessOptions}
                                className="text-[#444444] text-sm  mt-2"
                            >
                                - Show less
                            </button>
                        )
                    )}
                </>
            ) : (
                <p className="text-gray-500">No options available.</p>
            )}
        </div>
    );
}
