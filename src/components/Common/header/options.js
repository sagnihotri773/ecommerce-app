"use client";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React, { useState, useCallback, useMemo } from "react";

const Options = React.memo(function Options({ menuItems, isLoading = false, linkClass = "" }) {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const showSubOption = useCallback((value) => {
    setIsSubMenuOpen(true);
    setActiveId(value);
  }, []);

  const hideSubOption = useCallback(() => {
    setIsSubMenuOpen(false);
    setActiveId(null);
  }, []);

  const SubMenu = React.memo(({ category }) => (
    <div
      className="absolute top-full left-0 bg-white shadow-lg p-4 grid grid-cols-1 gap-4 z-10 text-black rounded-md"
      style={{ width: 120 * category.children.length }}
    >
      <div className={`flex justify-${category.children.length === 1 ? "center" : "between"}`}>
        {category.children.map((childCategory) => (
          <div key={childCategory.id} className="space-y-1">
            <h3 className="text-lg font-medium mb-4">
              <Link
                href={`/${childCategory.url}`}
                prefetch={false}
                className="hover:text-secondary transition duration-300"
              >
                {childCategory.name}
              </Link>
            </h3>
            <ul className="space-y-2">
              {childCategory.children?.map((subChild) => (
                <li key={subChild.id}>
                  <Link
                    href={`/${subChild.url}`}
                    prefetch={false}
                    className="font-light hover:text-secondary transition duration-300"
                  >
                    {subChild.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  ));

  const menuContent = useMemo(
    () => (
      <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm mt-2">
        {!isLoading ? (
          menuItems?.map((category) => (
            <li
              key={category.id}
              onMouseEnter={() => showSubOption(category.id)}
              onMouseLeave={hideSubOption}
            >
              <Link
                href={`/${category.url}`}
                prefetch={false}
                className={`${linkClass || "font-semibold uppercase transition-colors"} flex transition duration-300 ease-in-out ${
                  category.name === "Shop" ? "text-pink-500 hover:text-secondary" : ""
                }`}
              >
                {category.name}{" "}
                {category?.children?.length > 0 && <ChevronDown size={20} className="mx-2" />}
              </Link>

              <div className="relative">
                {isSubMenuOpen && activeId === category.id && category.children?.length > 0 && (
                  <SubMenu category={category} />
                )}
              </div>
            </li>
          ))
        ) : (
          <div className="flex gap-x-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="w-24 h-4 bg-gray-300 animate-pulse"></div>
            ))}
          </div>
        )}
      </ul>
    ),
    [menuItems, isSubMenuOpen, activeId, showSubOption, hideSubOption, isLoading, linkClass]
  );

  return menuContent;
});

export default Options;
