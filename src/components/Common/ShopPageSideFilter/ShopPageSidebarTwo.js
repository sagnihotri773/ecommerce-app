"use client";
import React, { useEffect, useState } from "react";
import ProductSize from "@/components/Product/ProductSize";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { buildQueryString, styles } from "@/components/Category/Extra";
export default function ShopPageSidebarTwo({
    filterValue = "",
    page,
    sort,
    setPage,
    attributesData,
    categoryPageData
}) {
    const [filter, setFilter] = useState({});
    const [search, setSearch] = useState('');
    const [selectedFilters, setSelectedFilters] = useState(filterValue || {});
    const [activeIndex, setActiveIndex] = useState(null);

    const pathname = usePathname();
    const { push, router } = useRouter();

    useEffect(() => {
        if (filter && Object.entries(filter)?.length) {
            filterPassInUrl();
        }
    }, [filter])


    useEffect(() => {
        filterPassInUrl();
    }, [search, sort, page])

    const filterPassInUrl = useDebouncedCallback((term) => {
        const queryString = buildQueryString(filter, page, search, sort);
        push(`${pathname}?${queryString}`);
    }, 1);


    const handleSearchFilter = (value) => {
        setSearch(value)
    };

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    const handleFilterChange = (attributeCode, value) => {
        setFilter((prevFilters) => {
            const updatedFilters = { ...prevFilters };
            setPage(1);
            if (attributeCode === "price") {
                const fromValue = updatedFilters[attributeCode]?.from;
                const toValue = updatedFilters[attributeCode]?.to;
                if (updatedFilters[attributeCode] && `${fromValue}_${toValue}` === value) {
                    delete updatedFilters[attributeCode];
                } else {
                    const [from, to] = value.split("_");
                    updatedFilters[attributeCode] = {
                        from: parseFloat(from),
                        to: parseFloat(to),
                    };
                }
            } else if (attributeCode !== "price") {
                if (updatedFilters[attributeCode]?.eq === value) {
                    delete updatedFilters[attributeCode];
                } else {
                    updatedFilters[attributeCode] = { eq: value };
                }
            }
            if (Object.keys(updatedFilters).length === 0) {
                push(pathname + '?');
            }

            return updatedFilters;
        });

        setSelectedFilters((prevSelectedFilters) => {
            const updatedSelectedFilters = { ...prevSelectedFilters };
            if (updatedSelectedFilters[attributeCode] === value) {
                delete updatedSelectedFilters[attributeCode];
            } else {
                updatedSelectedFilters[attributeCode] = value;
            }
            return updatedSelectedFilters;
        });
    };


    const removeAllFilter = () => {
        push(pathname);
        setFilter({});
        setSelectedFilters({});
        setPage(1)
    }
    
    return (
        <div
            className="rounded shadow dark:shadow-gray-800 p-4 sticky top-20 md:h-screen"
            style={{ overflowX: "auto" }}
        >
            {/* {renderHtmlDynamic(categoryPageData?.sidebarBlock)} */}

            <div className="flex justify-between">
                <h5 className="text-xl font-medium">Filter</h5>
                <button
                    onClick={(e) => {
                        removeAllFilter()
                    }}
                    className="bg-orange-600 text-white text-[12px] font-bold px-2.5 py-0.5 rounded h-5"
                >
                    {" "}
                    Remove All Filters ({Object.values(selectedFilters)?.length})
                </button>
            </div>



            <div className="mt-4">
                {attributesData?.map((aggregation, index) => (
                    <div key={aggregation.attribute_code} className="mb-4 border-b border-gray-300 pb-2">

                        <div
                            className="cursor-pointer flex justify-between items-center"
                            onClick={() => toggleAccordion(index)}
                        >
                            <h5 className="text-sm">
                                {aggregation.label}
                            </h5>
                            <span>{activeIndex === index ? "^"
                                : "^"
                            }</span>
                        </div>


                        <div className={`${activeIndex === index ? 'block' : 'hidden'} mt-2 transition-all`}>
                            {aggregation.attribute_code === "color" ? (
                                <ul className="list-none mt-2">
                                    {aggregation.options.map((option, i) => (
                                        <li className="inline" key={i}>
                                            <button
                                                className="size-6 rounded-full ring-2 ring-gray-200 dark:ring-slate-800 inline-flex align-middle"
                                                title={option?.label}
                                                style={{ backgroundColor: option?.label?.toLowerCase() }}
                                                onClick={() =>
                                                    handleFilterChange(aggregation.attribute_code, option.value)
                                                }
                                            />
                                        </li>
                                    ))}
                                </ul>
                            ) : aggregation.attribute_code === "size" ? (
                                <ProductSize
                                    data={aggregation}
                                    onClickFunction={handleFilterChange}
                                    selectedFilters={selectedFilters[aggregation.attribute_code]}
                                />
                            ) : (
                                <div>
                                    {aggregation.options.map((option) => (
                                        <button
                                            className={`px-4 py-2 m-1 rounded-lg shadow-md transition-all duration-300 ${selectedFilters[aggregation.attribute_code] === option.value
                                                    ? "bg-primary text-white"
                                                    : "bg-orange-200 hover:bg-primary hover:text-white text-primary"
                                                }`}
                                            key={option.value}
                                            style={{
                                                ...styles.filterButton,
                                            }}
                                            onClick={() =>
                                                handleFilterChange(aggregation.attribute_code, option.value)
                                            }
                                            aria-label={`Select ${option.label}`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}

                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
