import React from 'react'

export default function GroupedProduct({ product, errorMessages , selectedOptions , setSelectedOptions}) {
    return (
        <div >
            <h3>Grouped Items:</h3>
            {product.items.map((item) => (
                <div key={item.product.sku} className="flex justify-between items-center border-b py-4">
                    <div>
                    <p className="text-lg font-medium">{item.product.name}</p>
                    <p className="text-gray-500">${item.product.price.regularPrice.amount.value }</p>
                </div> 
                    <input
                        type="number"
                        min="0"
                         className="w-16 p-2 border border-gray-300 rounded"
                        value={
                            selectedOptions[product.sku]?.[item.product.sku] || 0
                        }
                        onChange={(e) =>
                            setSelectedOptions({
                                ...selectedOptions,
                                [product.sku]: {
                                    ...selectedOptions[product.sku],
                                    [item.product.sku]: parseInt(e.target.value, 10),
                                },
                            })
                        }
                    />
                </div>
            ))}
            {errorMessages[product.sku]?.general && (
                <p style={{ color: 'red' }}>
                    {errorMessages[product.sku].general}
                </p>
            )}
        </div>
    )
}
