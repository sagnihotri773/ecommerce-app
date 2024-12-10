"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { buildQueryString, styles } from "../../Category/Extra";
import { X } from "lucide-react";
import { renderHtmlDynamic } from "../../Util/commonFunctions";
import dynamic from "next/dynamic";
const ProductSize = dynamic(() => import('@/components/Product/ProductSize'), { ssr: false });

export default function ShopPageSidebarOne({
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

      <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
        <div className="relative">
          <input
            autoFocus
            type="text"
            value={search}
            placeholder="Search..."
            onChange={(e) => handleSearchFilter(e.target.value)}
            className="w-full px-3 py-2 text-sm text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          {search && (
            <button
              onClick={(e) => setSearch('')}
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      <div className="mt-4">
        {attributesData?.map((aggregation) =>
          aggregation.attribute_code == "color" ? (
            <div key={aggregation.attribute_code}>
              <h5 className="text-lg font-semibold me-2">
                {" "}
                {aggregation.label}{" "}
              </h5>
              <ul className="list-none mt-2">
                {aggregation.options.map((option, i) => (
                  <li className="inline" key={i}>
                    <button
                      className={`size-6 rounded-full ring-2 ring-gray-200 dark:ring-slate-800 inline-flex align-middle`}
                      title={option?.label}
                      style={{ backgroundColor: option?.label?.toLowerCase() }}
                      onClick={() =>
                        handleFilterChange(
                          aggregation.attribute_code,
                          option.value
                        )
                      }
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : aggregation.attribute_code == "size" ? (
            <div key={aggregation.attribute_code}>
              <h5 className="text-lg font-semibold me-2">
                {" "}
                {aggregation.label}{" "}
              </h5>
              <ProductSize
                data={aggregation}
                onClickFunction={handleFilterChange}
                selectedFilters={selectedFilters[aggregation.attribute_code]}
              />
            </div>
          ) : (
            <div key={aggregation.attribute_code}>
              <h3>{aggregation.label}:</h3>
              {aggregation.options.map((option) => (
                <button
                  className={
                    selectedFilters[aggregation.attribute_code] === option.value
                      ? `bg-primary text-white`
                      : "bg-orange-500/5 hover:bg-primary text-primary hover:text-white"
                  }
                  key={option.value}
                  style={{
                    ...styles.filterButton,
                  }}
                  onClick={() =>
                    handleFilterChange(aggregation.attribute_code, option.value)
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
