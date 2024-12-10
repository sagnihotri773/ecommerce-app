"use client";
import React from "react";
import {
  PaginationNextSvg,
  PaginationPrevSvg,
} from "@/components/SvgFiles/SvgFile";

export default function Pagination({
  currentPage = 0,
  totalPages = 0,
  onPageChange,
}) {


  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 4;
    const pageTotalNumber = Number(totalPages);
    if (pageTotalNumber <= maxVisiblePages) {
      for (let i = 1; i <= pageTotalNumber; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pageNumbers.push(1, 2, 3, 4, Number(pageTotalNumber) !== 0 && "...");
      } else if (currentPage > pageTotalNumber - 3) {
        pageNumbers.push(
          1,
          "...",
          pageTotalNumber - 3,
          pageTotalNumber - 2,
          pageTotalNumber - 1,
          pageTotalNumber === NaN ? 0 : pageTotalNumber
        );
      } else {
        pageNumbers.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          pageTotalNumber === NaN ? 0 : pageTotalNumber
        );
      }
    }
    return pageNumbers;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="grid md:grid-cols-12 grid-cols-1 mt-6">
      <div className="md:col-span-12 md:text-center">
        <nav aria-label="Page navigation example">
          <ul className="inline-flex items-center -space-x-px gap-3.5">
            {/* Previous button */}
            <li>
              <button
                className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-s-3xl hover:text-white border border-gray-100 dark:border-gray-800 hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <PaginationPrevSvg />
              </button>
            </li>

            {/* Page numbers */}
            {pageNumbers.map((number) => (
              <li key={number}>
                <button
                  className={`rounded-full size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white ${
                    currentPage === number
                      ? "bg-primary text-white border-primary"
                      : "bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary"
                  }`}
                  onClick={() => (number == "..." ? " " : onPageChange(number))}
                >
                  {number !== NaN ? number : ""}
                </button>
              </li>
            ))}

            {/* Next button */}
            <li>
              <button
                className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-e-3xl hover:text-white border border-gray-100 dark:border-gray-800 hover:border-primary dark:hover:border-primary hover:bg-primary dark:hover:bg-primary"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <PaginationNextSvg />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
