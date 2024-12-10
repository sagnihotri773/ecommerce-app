"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { buildQueryString } from "@/components/Category/Extra";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [selectedFilterOption, setSelectedFilterOption] = useState({});
    const [filter, setFilter] = useState({});
    const [selectedFilters, setSelectedFilters] = useState({});
    const [page, setPage] = useState(1);
    const [priceRange, setPriceRange] = useState([0,100]);
    const pathname = usePathname();
    const { push } = useRouter();

    // Function to manage the filter and update the URL
    const filterPassInUrl = useDebouncedCallback(() => {
        const queryString = buildQueryString(filter, page);
        push(`${pathname}?${queryString}`);
    }, 500); // debounce the URL update by 500ms

    // Function to handle filter change
    const handleFilterChange = (attributeCode, value, label) => {
        setFilter((prevFilters) => {
            const updatedFilters = { ...prevFilters };
            setPage(1); // Reset page to 1 on filter change

            if (attributeCode === "price") {
                const fromValue = updatedFilters[attributeCode]?.from;
                const toValue = updatedFilters[attributeCode]?.to;
                if (updatedFilters[attributeCode] && `${fromValue}_${toValue}` === value) {
                    delete updatedFilters[attributeCode]; // Remove filter if already selected
                } else {
                    updatedFilters[attributeCode] = {
                        from: parseFloat(value[0]),
                        to: parseFloat(value[1]),
                    };
                }
            } else {
                if (updatedFilters[attributeCode]?.eq === value) {
                    delete updatedFilters[attributeCode];
                } else {
                    updatedFilters[attributeCode] = { eq: value };
                }
            }
            filterPassInUrl(); // Update URL with new filters
            return updatedFilters;
        });

        setSelectedFilters((prevSelectedFilters) => {
            const updatedSelectedFilters = { ...prevSelectedFilters };
            if (updatedSelectedFilters[attributeCode] === value) {
                delete updatedSelectedFilters[attributeCode];
            } else {
                updatedSelectedFilters[attributeCode] = { value, label };
            }
            setSelectedFilterOption(updatedSelectedFilters);
            return updatedSelectedFilters;
        });
    };

    const removeAllFilter = () => {
        setFilter({});
        setSelectedFilters({});
        setPage(1);
        setSelectedFilterOption({});
        push(pathname);
    };

    const removeFilter = (attributeCode) => {
        setFilter((prevFilters) => {
            const updatedFilters = { ...prevFilters };
            delete updatedFilters[attributeCode];
            filterPassInUrl();
            return updatedFilters;
        });

        setSelectedFilters((prevSelectedFilters) => {
            const updatedSelectedFilters = { ...prevSelectedFilters };
            delete updatedSelectedFilters[attributeCode];
            return updatedSelectedFilters;
        });
    };

    return (
        <FilterContext.Provider value={{
            filter,
            selectedFilters,
            page,
            setPage,
            handleFilterChange,
            removeAllFilter,
            selectedFilterOption,
            setSelectedFilterOption,
            removeFilter,
            priceRange,
            setPriceRange
        }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = () => useContext(FilterContext);
