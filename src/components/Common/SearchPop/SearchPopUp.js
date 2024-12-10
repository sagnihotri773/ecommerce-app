"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GET_PRODUCTS, SEARCH_PRODUCT } from "@/lib/graphql/queries/products";
import { client } from "@/lib/graphql/apolloClient";
import { useForm } from "react-hook-form";
import { InputText } from "@/components/Util/Form/input";
import { getDynamicData } from "@/components/Util/commonGraphQuery";
import CardTen from "../ProductCard/CardTen";
import { addKeyListener } from "@/components/Util/commonFunctions";

export default function SearchInterface({ setSearchModel, searchModel }) {
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false); // New loading state
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [productss, setProducts] = useState(null);

  const {
    register,
    formState: { errors },
  } = useForm();

  const fetchProducts = useCallback(async () => {
    const values = {
      search: "",
      filters: {},
      sortField: {},
      pageSize: "5",
      currentPage: "1",
    };
    const result = await getDynamicData(GET_PRODUCTS, values);
    setProducts(result?.products?.items || []);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const fetchSearchResults = async (search) => {
    setLoading(true);
    try {
      const { data: searchResults } = await client.query({
        query: SEARCH_PRODUCT,
        variables: { search },
        fetchPolicy: "no-cache",
      });
      setSearchData(searchResults?.products?.items || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setSearchInput(newValue);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeoutId = setTimeout(() => {
      if (newValue) {
        fetchSearchResults(newValue);
      } else {
        setSearchData([]);
      }
    }, 500);

    setDebounceTimeout(timeoutId);
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

  const upsell_products = productss?.flatMap((product) =>
    product.upsell_products.map((rewrite) => rewrite)
  );

  useEffect(() => {
    // Adds the key listener once, and cleans it up on component unmount
    const cleanup = addKeyListener(() => setSearchModel(false));
    return cleanup; // Cleanup on unmount
  }, [setSearchModel]);

  useEffect(() => {
    if (searchModel) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [searchModel, productss, upsell_products]);
  console.log(searchData, "0000000");
  return (
    <AnimatePresence>
      {searchModel && (
        <>
          <div
            className="absolute inset-0 cursor-pointer h-screen bg-gradient-to-t to-transparent z-50 from-slate-900/90"
            style={{
              backgroundImage:
                "linear-gradient(to top, #000000b3, transparent)",
            }}
            onClick={() => setSearchModel(false)}
          ></div>
          <motion.div
            className="fixed  inset-0 bg-white top-0 bottom-auto z-50 overflow-y-auto"
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="flex justify-end cursor-pointer">
              <button
                onClick={() => setSearchModel(false)}
                className="hover:bg-gray-100 rounded-full p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="container mx-auto px-4 py-8 max-w-[1280px]">
              <div className="text-center">
                <h2 className="text-3xl mb-8">Search Our Site</h2>
              </div>

              <div className="relative mb-6 md:w-3/5 flex m-auto border-2 border-[#999]">
                <InputText
                  type="text"
                  className="w-full py-3 border-none ps-4 focus:ring-0 focus:outline-none"
                  onChange={handleInputChange}
                  register={register}
                  options={{ required: "This field is required" }}
                  value={searchInput}
                  errors={errors}
                  name={"search"}
                  placeholder="Enter keyword ..."
                  autoFocus={true}
                />
                <button className="absolute right-0 top-0 h-full px-4 border-l-2 border-[#999] bg-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
              </div>

              <div className="mb-8 h-[500px]">
                <h3 className="text-xl mb-6">
                  {searchInput ? "" : "Popular Products"}
                </h3>
                <div
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6"
                  onClick={() => setSearchModel(false)}
                >
                  {searchInput
                    ? searchData.length > 0
                      ? searchData.map((product) => (
                          <CardTen key={product.id} product={product} />
                        ))
                      : !isLoading && (
                          <div className="col-span-full text-center text-gray-500">
                            No products found
                          </div>
                        )
                    : upsell_products
                        ?.slice?.(0, 4)
                        ?.map((product) => (
                          <CardTen key={product.id} product={product} />
                        ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
