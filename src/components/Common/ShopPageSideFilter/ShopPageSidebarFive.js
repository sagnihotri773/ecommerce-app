"use client"

import React, { useEffect, useState } from "react"
import { usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { buildQueryString } from "@/components/Category/Extra"
import { AlignLeftSvg, ArrowUpSvg, DownArrowSvg } from "@/components/SvgFiles/SvgFile"

export default function ShopPageSidebarFive({
    filterValue = "",
    page,
    sort,
    setPage,
    attributesData,
}) {
    const [filter, setFilter] = useState({})
    const [search, setSearch] = useState('')
    const [selectedFilters, setSelectedFilters] = useState(filterValue || {})
    const [activeIndex, setActiveIndex] = useState(null)
    const [isFilterVisible, setIsFilterVisible] = useState(false)
    const [visibleCounts, setVisibleCounts] = useState({}); 

    const pathname = usePathname()
    const { push } = useRouter()

    useEffect(() => {
        if (filter && Object.entries(filter)?.length) {
            filterPassInUrl()
        }
    }, [filter])

    useEffect(() => {
        filterPassInUrl()
    }, [search, sort, page])

    const filterPassInUrl = useDebouncedCallback((term) => {
        const queryString = buildQueryString(filter, page, search, sort)
        push(`${pathname}?${queryString}`)
    }, 1)

    const handleSearchFilter = (value) => {
        setSearch(value)
    }

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index)
    }

    const handleFilterChange = (attributeCode, value) => {
        setFilter((prevFilters) => {
            const updatedFilters = { ...prevFilters }
            setPage(1)
            if (attributeCode === "price") {
                const fromValue = updatedFilters[attributeCode]?.from
                const toValue = updatedFilters[attributeCode]?.to
                if (updatedFilters[attributeCode] && `${fromValue}_${toValue}` === value) {
                    delete updatedFilters[attributeCode]
                } else {
                    const [from, to] = value.split("_")
                    updatedFilters[attributeCode] = {
                        from: parseFloat(from),
                        to: parseFloat(to),
                    }
                }
            } else if (attributeCode !== "price") {
                if (updatedFilters[attributeCode]?.eq === value) {
                    delete updatedFilters[attributeCode]
                } else {
                    updatedFilters[attributeCode] = { eq: value }
                }
            }
            if (Object.keys(updatedFilters).length === 0) {
                push(pathname + '?')
            }

            return updatedFilters
        })

        setSelectedFilters((prevSelectedFilters) => {
            const updatedSelectedFilters = { ...prevSelectedFilters }
            if (updatedSelectedFilters[attributeCode] === value) {
                delete updatedSelectedFilters[attributeCode]
            } else {
                updatedSelectedFilters[attributeCode] = value
            }
            return updatedSelectedFilters
        })
    }

    const removeAllFilter = () => {
        push(pathname)
        setFilter({})
        setSelectedFilters({})
        setPage(1)
    }

    const toggleFilterVisibility = () => {
        setIsFilterVisible(!isFilterVisible)
    }

    const showMoreOptions = (attributeCode) => {
        setVisibleCounts((prevCounts) => ({
            ...prevCounts,
            [attributeCode]: (prevCounts[attributeCode] || 10) + 10
        }));
    };

    return (
        <>
            <p onClick={toggleFilterVisibility} className="cursor-pointer flex items-center gap-2">
                <AlignLeftSvg />
                Filter {isFilterVisible ? <ArrowUpSvg /> : <DownArrowSvg />}
            </p>
            <div
                className={`${isFilterVisible ? 'opacity-100' : 'opacity-0 max-h-0'
                    } transition-all duration-500 ease-in-out overflow-hidden`}
            >
                <div
                    className="rounded shadow dark:shadow-gray-800 p-4 sticky mb-4 top-20"
                    style={{ overflowX: "auto" }}
                >
                    {/* {renderHtmlDynamic(categoryPageData?.sidebarBlock)} */}

                    <div className="flex justify-end">
                        <button
                            onClick={removeAllFilter}
                            className="bg-orange-600 flex items-center text-white text-[12px] font-bold px-2.5 py-4 rounded h-5"
                        >
                            Remove All Filters ({Object.values(selectedFilters)?.length})
                        </button>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-4">
                        {attributesData?.map((aggregation, index) => (
                            <div key={aggregation.attribute_code} className="border-b border-gray-300 pb-2">
                                <div
                                    className="cursor-pointer flex justify-between items-center"
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <h5 className="text-sm font-bold">
                                        {aggregation.label}
                                    </h5>
                                </div>

                                <div>
                                    {aggregation.attribute_code === "color" ? (
                                        <ul className="list-none mt-2 flex flex-wrap gap-2">
                                            {aggregation.options.map((option, i) => (
                                                <li key={i}>
                                                    <button
                                                        className="size-6 rounded-full ring-2 ring-gray-200 dark:ring-slate-800  align-middle"
                                                        title={option?.label}
                                                        style={{ backgroundColor: option?.label?.toLowerCase() }}
                                                        onClick={() =>
                                                            handleFilterChange(aggregation.attribute_code, option.value)
                                                        }
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="flex flex-wrap gap-4 cursor-pointer">
                                            {aggregation.options.slice(0, visibleCounts[aggregation.attribute_code] || 10).map((option) => (
                                                <p
                                                    key={option.value}
                                                    className={`transition-all duration-300 text-gray-500 hover:text-primary ${
                                                        selectedFilters[aggregation.attribute_code] === option.value
                                                            ? "!text-primary"
                                                            : "text-gray-400"
                                                    } flex-none py-2`}
                                                    onClick={() => handleFilterChange(aggregation.attribute_code, option.value)}
                                                    aria-label={`Select ${option.label}`}
                                                >
                                                    {option.label}
                                                </p>
                                            ))}
                                            {aggregation.options.length > (visibleCounts[aggregation.attribute_code] || 10) && (
                                                <button onClick={() => showMoreOptions(aggregation.attribute_code)} className="text-primary">
                                                    Load More
                                                </button>
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
    )
}
