"use client";
import React from "react";
import { SlidersHorizontal } from "lucide-react";
import { FourBlockGridIcon, SimpleGridIcon } from "../SvgFiles/SvgFile";

export const filterClass = "form-select form-input md:w-24 md:mt-0 mt-1 py-2 h-10 bg-transparent dark:bg-slate-900 text-[#444444] text-base dark:text-slate-200 rounded outline-none border-none border-gray-100 dark:border-gray-800 focus:ring-0"
export default function FilterProduct({ handleSortByFilter, data, setView, view, toggleFilters, showFilters, length }) {

  return (
    <div className="md:flex justify-between items-center mb-6">
      <span className="font-semibold hidden md:block">
        Showing 1 – {length < data?.items?.length ? data?.items?.length : length} products of {data?.total_count} products
      </span>
      <div className="flex space-x-2 hidden md:block">
        {/* Grid View Button */}
        <button
          onClick={() => setView(true)}
          className={`p-2 border ${view ? "bg-gray-300" : "bg-white"
            } rounded-l-md`}
        >
          <FourBlockGridIcon/>
        </button>

        {/* List View Button */}
        <button
          onClick={() => setView(false)}
          className={`p-2 border ${!view ? "bg-gray-300" : "bg-white"
            } rounded-r-md`}
        >
          <SimpleGridIcon/>
        </button>
      </div>


      <div className="md:flex items-center">
        <button
          onClick={toggleFilters}
          className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none mr-3 hidden md:block"
        >
          <span > {showFilters ? "Hide Filters" : "Show Filters"} </span>
          <SlidersHorizontal className="h-4 w-4" />
        </button>
        <label className="font-semibold md:me-2">Sort by:</label>

        <select className={filterClass} onChange={(e) => handleSortByFilter(e.target.value)}>
          <option value=""> Filter </option>
          {data?.sort_fields?.options.map((option,index) => (
            <React.Fragment key={index}>
              <option key={`${option.value}_ASC`} value={`${option.value}_ASC`}>
                {option.label} (ASC)
              </option>
              <option key={`${option.value}_DESC`} value={`${option.value}_DESC`}>
                {option.label} (DESC)
              </option>
            </React.Fragment>
          ))}
        </select>
      </div>
    </div>
  );
}
