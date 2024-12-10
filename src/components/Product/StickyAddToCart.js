import React, { useEffect, useState } from 'react';

export default function StickyAddToCart({ data, ProductQuantityStyleTwo, HoverAddToCartButtonV4 }) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(!entry.isIntersecting); // Toggle visibility based on intersection
            },
            {
                threshold: 0, // Trigger as soon as any part of the element is outside the viewport
                rootMargin: '-160px 0px -20px 0px',
            }
        );

        const element = document.querySelector('.mt-4.space-x-1'); // Target the specific div
        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, []);

    if (!isVisible) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg transform transition-transform duration-300 z-40">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Product Info - Hidden on mobile */}
                    <div className="hidden md:flex items-center gap-4 flex-1">
                        <img
                            src={data?.image?.url}
                            alt={data?.name}
                            className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                            <h3 className="font-medium text-sm">{data?.name}</h3>
                            <p className="text-lg font-bold">$500</p>
                        </div>
                    </div>

                    {/* Quantity Controls and Add to Cart */}
                    <div className="flex items-center gap-4 flex-1 md:justify-end justify-between">

                        <ProductQuantityStyleTwo />

                        {/* Add to Cart Button */}
                        <HoverAddToCartButtonV4 />
                        {/* <button
                            className="hover:bg-primary hover:border-primary hover:text-white border-2 border-black w-[30%] font-bold text-black flex items-center justify-center h-12 transition-all duration-500"
                        >
                            Add to cart
                        </button> */}
                    </div>
                </div>
            </div>
        </div>

    )
}
