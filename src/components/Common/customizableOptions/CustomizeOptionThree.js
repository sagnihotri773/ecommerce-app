import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import classNames from 'classnames';

export default function CustomizableOptionThree({ product, errorMessages, selectedOptions, handleOptionChange }) {
  const t = useTranslations("ProductDetail");
  const [hoveredValue, setHoveredValue] = useState(null);

  const getOptionStyle = (option, value, isSelected) => {
    if (option.label.toLowerCase() === 'color') {
      return {
        backgroundColor: value.label.toLowerCase(),
        width: '2rem',
        height: '2rem',
        border: isSelected ? '2px solid black' : '1px solid #e2e8f0',
        padding: 0,
      };
    }
    return {};
  };

  const hasColorAndSize = product?.configurable_options?.some(
    option => option.label.toLowerCase() === 'color'
  ) && product?.configurable_options?.some(
    option => option.label.toLowerCase() === 'size'
  );

  const renderTooltip = (value) => (
    <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-10">
      <div className="relative">
        <div className="bg-[#C4A484] text-white px-3 py-1 rounded text-sm whitespace-nowrap">
          {value.label}
        </div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#C4A484] rotate-45" />
      </div>
    </div>
  );

  return (
    <div>
      <div className='space-y-4'>
        {product?.configurable_options?.map((option) => {
          const isColor = option.label.toLowerCase() === 'color';
          const isSize = option.label.toLowerCase() === 'size';

          return (
            <div key={option.attribute_id}>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                {option.label}
              </label>
              <div className="flex gap-2">
                {option.values.map((value) => {
                  const isSelected = selectedOptions[option.attribute_code] === value.value_index;
                  
                  if (hasColorAndSize && (isColor || isSize)) {
                    return (
                      <div className="relative" key={value.value_index}>
                        {hoveredValue === value.value_index && renderTooltip(value)}
                        <button
                          onClick={() => handleOptionChange(option.attribute_code, value.value_index)}
                          onMouseEnter={() => setHoveredValue(value.value_index)}
                          onMouseLeave={() => setHoveredValue(null)}
                          style={isColor ? getOptionStyle(option, value, isSelected) : {}}
                          className={classNames(
                            "focus:outline-none",
                            isColor
                              ? isSelected ? "ring-2 ring-black ring-offset-1" : ""
                              : `min-w-[2.5rem] h-10 border border-gray-200 ${
                                  isSelected 
                                    ? "bg-black text-white" 
                                    : "bg-white text-gray-900 hover:bg-gray-50"
                                }`
                          )}
                          aria-label={`Select ${option.label.toLowerCase()} ${value.label}`}
                        >
                          {!isColor && value.label}
                        </button>
                      </div>
                    );
                  }

                  // Default styling for other options
                  return (
                    <button
                      key={value.value_index}
                      onClick={() => handleOptionChange(option.attribute_code, value.value_index)}
                      className={classNames(
                        "focus:outline-none px-3 py-1 border rounded-full text-sm",
                        isSelected && "bg-primary text-white"
                      )}
                      title={value.label}
                    >
                      {value.label}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {errorMessages && <p className="mt-2 text-sm text-red-600">{errorMessages}</p>}
    </div>
  );
}

