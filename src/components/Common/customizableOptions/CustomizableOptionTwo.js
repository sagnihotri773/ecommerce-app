import { useTranslations } from 'next-intl';
import React from 'react';
import classNames from 'classnames';

export default function CustomizableOptionTwo({ product, errorMessages, selectedOptions, handleOptionChange }) {
    const t = useTranslations("ProductDetail");
    
    const getOptionStyle = (option, value, isSelected) => {
        if (option.label.toLowerCase() === 'color') {
            return {
                backgroundColor: value.label.toLowerCase(),
                width: '2rem',
                height: '2rem',
                borderRadius: '50%',
                border: isSelected ? '2px solid black' : '1px solid #e2e8f0'
            };
        }
        return {};
    };

    return (
        <div>
            <div className='space-y-4'>
                {product?.configurable_options?.map((option) => (
                    <div key={option.attribute_id}>
                        <label className="block mb-2 text-sm font-medium text-gray-700">{option.label}</label>
                        <div className="flex space-x-2">
                            {option.values.map((value) => {
                                const isSelected = selectedOptions[option.attribute_code] === value.value_index;
                                return (
                                    <button
                                        key={value.value_index}
                                        onClick={() => handleOptionChange(option.attribute_code, value.value_index)}
                                        // style={getOptionStyle(option, value, isSelected)}
                                        className={classNames(
                                            "focus:outline-none px-3 py-1 border rounded-full text-sm",
                                            isSelected && "bg-primary text-white"
                                        )}
                                        title={value?.label}
                                    >
                                        {value.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
            {errorMessages && <p className="mt-2 text-sm text-red-600">{errorMessages}</p>}
        </div>
    );
}