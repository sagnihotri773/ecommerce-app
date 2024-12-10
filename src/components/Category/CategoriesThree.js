import { GET_CATEGORY } from "@/lib/graphql/queries/category";
import React, { useEffect, useState, useCallback } from "react";
import { getDynamicData } from "../Util/commonGraphQuery";
import { Link } from "@/components/ui/Link";
import Man from "@/assets/Images/mens-ware.jpg";
import Image from "next/image";

export default function CategoriesThree({ data, fetchData = false }) {
  const [categories, setCategories] = useState(data || []);
  const [loading, setLoading] = useState(fetchData);

  const fetchCategories = useCallback(async () => {
    if (fetchData) {
      setLoading(true);
      const result = await getDynamicData(GET_CATEGORY, { search: "" });
      const res = result?.categoryList[0]?.children || [];
      setCategories(res);
      setLoading(false);
    }
  }, [fetchData]);

  useEffect(() => {
    if (fetchData) {
      fetchCategories();
    } else {
      setCategories(data);
      setLoading(false);
    }
  }, [fetchData, data, fetchCategories]);

  const getImg = (img) => (img ? img : Man);

  const renderCategory = (category) => {
    const imgSrc = getImg([null].includes(category?.image) ? category?.banner_image : category?.image);
    return (
      <div key={category.id} className="relative group overflow-hidden">
        <Link className="text-center" href={`/${category.url}`} prefetch={true}>
          <div className="aspect-[3/4] w-full overflow-hidden">
            <Image
              src={imgSrc}
              alt={`Illustration for ${category.name}`}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              width={300}
              height={400}
              priority
            />
          </div>
          <div className="absolute left-4 right-4 bottom-4 bg-white text-[#444444] text-center py-2 transition-colors duration-300 hover:text-secondary">
            {category.name}
          </div>
        </Link>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto pt-[60px] px-4 md:px-0 md:h-[452px]">
        <div className="hidden md:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="relative bg-gray-200 rounded animate-pulse w-full h-96"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (categories?.length === 0) {
    return 
  }

  return (
    <div className="container mx-auto pt-[60px] px-4 md:px-0 md:h-[452px]">
      <div className="hidden md:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories?.map(renderCategory)}
      </div>

      <div className="md:hidden relative">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <div className="flex overflow-x-auto space-x-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {categories?.map((category) => (
            <div key={category.id} className="flex-none relative w-60">
              <Link className="text-center" href={`/${category.url}`} prefetch={true}>
                <div className="relative w-full h-80">
                  <Image
                    src={getImg([null].includes(category?.image) ? category?.banner_image : category?.image)}
                    alt={`Illustration for ${category.name}`}
                    className="object-cover w-full h-full rounded-lg"
                    width={240}
                    height={240}
                    priority
                  />
                </div>
                <div className="absolute left-4 right-4 bottom-4 bg-white text-black text-center py-2">
                  {category.name}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
