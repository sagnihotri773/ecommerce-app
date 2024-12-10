"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Minus, Plus } from "lucide-react";
import dynamic from "next/dynamic";
import { useFilter } from "@/components/Util/context/FilterContext";
import { buildQueryString } from "@/components/Category/Extra";
import { AlignLeftSvg, ArrowUpSvg, DownArrowSvg } from "@/components/SvgFiles/SvgFile";

const ProductSize = dynamic(() => import("@/components/Product/ProductSize"), { ssr: false });
const PriceSlider = dynamic(() => import("@/components/Product/PriceSlider"), { ssr: false });


export default function ShopPageSidebarThree({
    page,
    sort,
    attributesData,
    FilterVisible = false,
}) {
    const [search, setSearch] = useState("");
    const [activeIndex, setActiveIndex] = useState(
        attributesData?.map((_, index) => index) || []
    );
    const [isFilterVisible, setIsFilterVisible] = useState(FilterVisible);
    const {filter, handleFilterChange, removeAllFilter, selectedFilters } = useFilter();
    const [visibleCounts, setVisibleCounts] = useState({});

    const pathname = usePathname();
    const { push } = useRouter();

    useEffect(() => {
        if (filter && Object.entries(filter)?.length) {
            filterPassInUrl();
        }
    }, [filter]);

    useEffect(() => {
        filterPassInUrl();
    }, [search, sort, page]);

    const filterPassInUrl = () => {
        const queryString = buildQueryString(filter, page, search, sort);
        push(`${pathname}?${queryString}`);
    };


    const toggleAccordion = (index) => {
        setActiveIndex((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index) 
                : [...prev, index] 
        );
    };

    const toggleFilterVisibility = () => {
        setIsFilterVisible(!isFilterVisible);
    };

    const showMoreOptions = (attributeCode) => {
        setVisibleCounts((prevCounts) => ({
            ...prevCounts,
            [attributeCode]: (prevCounts[attributeCode] || 5) + 5,
        }));
    };

    const showLessOptions = (attributeCode) => {
        setVisibleCounts((prevCounts) => ({
            ...prevCounts,
            [attributeCode]: 5,
        }));
    };

    return (
        <>
            {!FilterVisible && (
                <p
                    onClick={toggleFilterVisibility}
                    className="cursor-pointer flex items-center gap-2"
                >
                    <AlignLeftSvg />
                    Filter {isFilterVisible ? <ArrowUpSvg /> : <DownArrowSvg />}
                </p>
            )}
            <div
                className={`${isFilterVisible ? "opacity-100" : "opacity-0 max-h-0"
                    } transition-all duration-500 ease-in-out overflow-hidden`}
            >
                <div
                    className={`md:h-auto h-[78vh] rounded dark:shadow-gray-800 sticky mb-4 top-20 ${!FilterVisible ? "p-4" : ""
                        }`}
                    style={{ overflowX: "auto" }}
                >
                    <div>
                        {attributesData?.map((aggregation, index) => (
                            <div
                                key={index}
                                className="mb-4 border-b border-gray-300 pb-2"
                            >
                                <div
                                    className="flex justify-between items-center cursor-pointer mb-2"
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <h3 className="font-[400] text-[#111111] text-xl">
                                        {aggregation.label}
                                    </h3>
                                    {activeIndex.includes(index) ? (
                                        <Minus size={20} />
                                    ) : (
                                        <Plus size={20} />
                                    )}
                                </div>

                                <div
                                    className={`${activeIndex.includes(index)
                                        ? "h-full opacity-100"
                                        : "max-h-0 opacity-0"
                                        } overflow-hidden transition-all duration-500 ease-in-out`}
                                >
                                    {aggregation.attribute_code === "color" ? (
                                        <div className="grid grid-cols-10 gap-1 py-2">
                                            {aggregation.options.map((option,index) => (
                                                <button
                                                    key={index}
                                                    className={`w-6 h-6 rounded-sm ${option.label} ${selectedFilters[aggregation.attribute_code]?.value ==
                                                        option.value
                                                        ? "ring-2 ring-blue-500 ring-offset-2"
                                                        : ""
                                                        }`}
                                                    style={{
                                                        backgroundColor: option?.label?.toLowerCase(),
                                                    }}
                                                    onClick={() =>
                                                        handleFilterChange(
                                                            aggregation.attribute_code,
                                                            option.value,
                                                            option.label
                                                        )
                                                    }
                                                    title={option?.label}
                                                >
                                                    <span className="sr-only text-[#e5e7eb]">
                                                        {option?.label}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    ) : aggregation.attribute_code === "size" ? (
                                        <ProductSize
                                            data={aggregation}
                                            onClickFunction={handleFilterChange}
                                            selectedFilters={selectedFilters[aggregation.attribute_code]}
                                        />
                                    ) : aggregation.attribute_code === "price" ? (
                                        <PriceSlider
                                            data={aggregation}
                                            onClickFunction={handleFilterChange}
                                            selectedFilters={selectedFilters[aggregation.attribute_code]}
                                        />
                                    ) : (
                                        <div>
                                            {aggregation.options
                                            .slice(0, visibleCounts[aggregation.attribute_code] || 5)
                                            .map((option,index) => (
                                                    <div key={index}>
                                                        <div
                                                            key={option.value}
                                                            className="flex justify-between items-center text-sm py-2"
                                                        >
                                                            <span
                                                                className={`cursor-pointer ${selectedFilters[aggregation.attribute_code]?.value === option.value
                                                                    ? "text-[#444444] text-base"
                                                                    : "hover:text-secondary text-[#444444]"
                                                                    }`}
                                                                onClick={() =>
                                                                    handleFilterChange(
                                                                        aggregation.attribute_code,
                                                                        option.value,
                                                                        option.label
                                                                    )
                                                                }
                                                            >
                                                                {option.label}
                                                            </span>
                                                            <span className="text-[#444444] bg-[#e5e7eb] px-2 py-1">
                                                                {option.count}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            {aggregation.options.length >
                                                (visibleCounts[aggregation.attribute_code] || 5) ? (
                                                <button
                                                    onClick={() =>
                                                        showMoreOptions(aggregation.attribute_code)
                                                    }
                                                    className="text-[#444444] text-base"
                                                >
                                                    + Show more
                                                </button>
                                            ) : (
                                                aggregation.options.length > 5 && (
                                                    <button
                                                        onClick={() =>
                                                            showLessOptions(aggregation.attribute_code)
                                                        }
                                                        className="text-[#444444] text-base"
                                                    >
                                                        - Show less
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
