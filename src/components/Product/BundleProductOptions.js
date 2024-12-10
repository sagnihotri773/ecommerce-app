import React from 'react';
import Select from 'react-select';
import dynamic from "next/dynamic";
const Price = dynamic(() => import('@/components/Currency/Price'), { ssr: false });

export default function BundleProduct({ product, selectedOptions, handleOptionChange, errorMessages }) {

    const showOptionPrice = (option) => {
        const value = option?.final_price?.value || option?.regular_price?.value
        return value
    }

    const renderInput = (option) => {
        switch (option.type) {
            case 'radio':
                return option.options.map((opt) => (
                    <div key={opt.id} className="mb-2">
                        <label className="inline-flex items-center space-x-2">
                            <input
                                type="radio"
                                name={`option-${option.option_id}`}
                                value={opt.id}
                                className="form-radio text-indigo-600"
                                checked={selectedOptions[product.sku]?.[option.option_id] === opt.id}
                                onChange={() => handleOptionChange(product.sku, option.option_id, opt.id)}
                            />
                            <span className="text-gray-700">
                                {opt.label} <Price amount={showOptionPrice(opt.product?.price_range?.minimum_price)} />
                            </span>
                        </label>
                    </div>
                ));
            case 'checkbox':
                return option.options.map((opt) => (
                    <div key={opt.id} className="mb-2">
                        <label className="inline-flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name={`option-${option.option_id}`}
                                value={opt.id}
                                className="form-checkbox text-indigo-600"
                                checked={selectedOptions[product.sku]?.[option.option_id]?.includes(opt.id)}
                                onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    const currentOptions = selectedOptions[product.sku]?.[option.option_id] || [];
                                    const updatedOptions = isChecked
                                        ? [...currentOptions, opt.id]
                                        : currentOptions.filter((id) => id !== opt.id);

                                    handleOptionChange(product.sku, option.option_id, updatedOptions);
                                }}
                            />
                            <span className="text-gray-700">
                                {opt.label} <Price amount={showOptionPrice(opt.product?.price_range?.minimum_price)} />
                            </span>
                        </label>
                    </div>
                ));
            case 'select':
                return (
                    <select
                        className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        name={`option-${option.option_id}`}
                        value={selectedOptions[product.sku]?.[option.option_id] || ''}
                        onChange={(e) => handleOptionChange(product.sku, option.option_id, e.target.value)}
                    >
                        <option value="">Select an option</option>
                        {option.options.map((opt) => (
                            <option key={opt.id} value={opt.id}>
                                {opt.label} <Price amount={showOptionPrice(opt.product?.price_range?.minimum_price)} />
                            </option>
                        ))}
                    </select>
                );
            case 'multi':
                const selectedValueIds = selectedOptions[product.sku]?.[option.option_id] || [];
                return (
                    <Select
                    isMulti
                    value={option.options
                        .filter((opt) => selectedValueIds.includes(opt.id)) // Filter to get selected options
                        .map((opt) => ({
                            value: opt.id,
                            label: (
                                <>
                                    {opt.label} <Price amount={showOptionPrice(opt.product?.price_range?.minimum_price)} />
                                </>
                            ),
                        }))}
                    options={option.options.map((opt) => ({
                        value: opt.id,
                        label: (
                            <>
                                {opt.label} <Price amount={showOptionPrice(opt.product?.price_range?.minimum_price)} />
                            </>
                        ),
                    }))}
                    onChange={(selected) => handleOptionChange(
                        product.sku,
                        option.option_id,
                        selected.map((opt) => opt.value) // Update with selected values' IDs
                    )}
                    className="mt-2"
                />
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <h3>Bundle Items:</h3>
            {product?.items?.map((item) => (
                <div key={item.option_id}>
                    <h3>{item.title} {item.required ? '*' : ''}</h3>
                    {renderInput(item)}
                    {errorMessages[product.sku]?.[item.option_id] && (
                        <p style={{ color: 'red' }}>
                            {errorMessages[product.sku][item.option_id]}
                        </p>
                    )}
                </div>
            ))}
        </div>
    )
}
