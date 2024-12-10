// ConfigurableProduct 

import { useTranslations } from 'next-intl'
import React from 'react'

export default function CustomizableOptionOne({ product, errorMessages, selectedOptions, handleOptionChange }) {
    
  const t = useTranslations("Products");
    
    return (
        <div>
            <h3>{t('ConfigurableOptions')}:</h3>

            {product?.configurable_options?.map((option) => (
                <div key={option.attribute_id}>
                    <label>{option.label}:</label>
                    <select
                        // Set the value from selectedOptions if available
                        value={selectedOptions[option.attribute_code] || ''}
                        onChange={(e) => handleOptionChange(option.attribute_code, e.target.value)}
                        className="block sm:w-[500px] w-full p-2 mt-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Select {option.label}</option>
                        {option?.values?.map((value) => (
                            <option key={value.value_index} value={value.value_index}>
                                {value.label}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
            {errorMessages && <p style={{ color: 'red' }}>{errorMessages}</p>}
        </div>
    )
}
