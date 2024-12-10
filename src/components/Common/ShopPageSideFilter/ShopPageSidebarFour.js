"use client"

import React, { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import { ChevronDown, ChevronUp } from "lucide-react"
import { renderHtmlDynamic } from "@/components/Util/commonFunctions"
import { buildQueryString } from "@/components/Category/Extra"

export default function ShopPageSidebarFour({
    filterValue = "",
    page,
    sort,
    setPage,
    attributesData,
    categoryPageData,
}) {
    const [filter, setFilter] = useState({})
    const [search, setSearch] = useState("")
    const [selectedFilters, setSelectedFilters] = useState(filterValue || {})
    const [activeFilter, setActiveFilter] = useState(null)

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

    const filterPassInUrl = useDebouncedCallback(() => {
        const queryString = buildQueryString(filter, page, search, sort)
        push(`${pathname}?${queryString}`)
    }, 1)

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
                push(pathname + "?")
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

    const toggleFilter = (index) => {
        setActiveFilter(activeFilter === index ? null : index)
    }

    return (
        <>
            <h5 className="text-3xl pb-3">Filters :</h5>
            <div className="mb-8">

                <div className="flex flex-wrap gap-2 mb-4">
                    {attributesData?.map((aggregation, index) => (
                        <div key={aggregation.attribute_code} className="">
                            <button
                                onClick={() => toggleFilter(index)}
                                className="px-4 py-2 bg-black text-white rounded-full flex items-center"
                            >
                                {aggregation.label}
                                {activeFilter === index ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />}
                            </button>
                            {activeFilter === index && (
                                <div className="absolute z-10 mt-2 p-4 bg-white rounded-lg shadow-lg transition-all">
                                    {aggregation.attribute_code === "color" ? (
                                        <div className="grid grid-cols-6 gap-2">
                                            {aggregation.options.map((option, i) => (
                                                <button
                                                    key={i}
                                                    className="w-6 h-6 rounded-full ring-2 ring-gray-200"
                                                    style={{ backgroundColor: option?.label?.toLowerCase() }}
                                                    onClick={() => handleFilterChange(aggregation.attribute_code, option.value)}
                                                    title={option?.label}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-2 transition-all">
                                            {aggregation.options.map((option) => (
                                                <button
                                                    key={option.value}
                                                    className={`px-4 py-2 rounded-lg ${selectedFilters[aggregation.attribute_code] === option.value
                                                            ? "bg-black text-white"
                                                            : "bg-gray-200 hover:bg-gray-300"
                                                        }`}
                                                    onClick={() => handleFilterChange(aggregation.attribute_code, option.value)}
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center">
                    <button
                        onClick={removeAllFilter}
                        className="bg-red-600 text-white text-sm font-bold px-4 py-2 rounded"
                    >
                        Remove All Filters ({Object.values(selectedFilters)?.length})
                    </button>

                </div>
                {/* {renderHtmlDynamic(categoryPageData?.sidebarBlock)} */}
            </div>
        </>
    )
}