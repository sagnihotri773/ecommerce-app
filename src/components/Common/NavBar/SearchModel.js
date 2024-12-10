"use client";
import { useForm } from "react-hook-form";
import { SEARCH_PRODUCT } from "@/lib/graphql/queries/products";
import { client } from "@/lib/graphql/apolloClient";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { InputText } from "@/components/Util/Form/input";
import dynamic from "next/dynamic";
import { truncateTitle } from "@/components/Util/commonFunctions";
const Price = dynamic(() => import("@/components/Currency/Price"), {
  ssr: false,
});
const Loader = dynamic(() => import("@/components/Util/Loader/Loader"), {
  ssr: false,
});
const PopoverLayout = dynamic(() => import("@/components/Layout/Popover"), {
  ssr: false,
});

export const SearchModel = ({ setSearchModel, searchModel }) => {
  const router = useRouter();
  const params = useParams();
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false); // New loading state
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  let length = 80;
  const descriptionRender = (value = "") => {
    const unescapedHtml = value
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'");

    return unescapedHtml?.length > length
      ? unescapedHtml.slice(0, 80) + "..."
      : unescapedHtml;
  };

  const {
    register,
    formState: { errors },
  } = useForm();

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

  useEffect(() => {
    if (searchModel) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [searchModel]);

  return (
    <PopoverLayout closeLayout={setSearchModel} openLayout={searchModel}>
      <div className="flex justify-center w-full h-[80vh]">
        <div className="dropdown-menu absolute md:px-8 px-0 overflow-hidden end-0 m-0 mt-5 z-10 w-full rounded-md dark:bg-slate-900 ">
          <div className="relative !bg-black-300">
            <InputText
              type="text"
              className="px-3 pe-10 w-full py-5 border-0 !bg-black focus:ring-0 h-[66px] outline-none text-white"
              onChange={handleInputChange}
              register={register}
              options={{ required: "This field is required" }}
              value={searchInput}
              errors={errors}
              name={"search"}
              placeholder="Search..."
              cotainerClasaName="md:w-[80%] w-[90%] m-auto"
              autoFocus={true}
            />
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-[598px] bg-white md:w-[80%] w-[90%] m-auto">
              <Loader />
            </div>
          ) : (
            <ul
              className="flex md:w-[80%] w-[90%] m-auto flex-wrap bg-white p-4 md:h-[598px] h-[80vh] overflow-y-auto"
              onClick={() => setSearchModel(false)}
            >
              {searchData.length > 0 && (
                <p className="w-full text-lg font-semibold mb-4">Products</p>
              )}
              {searchData.length > 0
                ? searchData.map((item) => (
                  <li
                    key={item?.id}
                    className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 flex flex-col cursor-pointer items-center"
                    onClick={() =>
                      router.push(`/${item?.url_rewrites?.[0]?.url}`)
                    }
                  >
                    <a href={item?.url} className="block w-full">
                      <div
                        className="relative w-full"
                        style={{ paddingBottom: "100%" }}
                      >
                        <img
                          src={item?.image?.url}
                          alt={item?.name}
                          className="absolute inset-0 w-full h-full object-contain"
                        />
                      </div>
                      <div className="mt-2 text-center">
                        <p
                          className="text-xl  text-[#3ac39c] hover:underline text-base"
                          title={item?.name}
                        >
                          {truncateTitle(item?.name)}
                        </p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: descriptionRender(
                              item?.description?.html
                            ),
                          }}
                        />
                        <div className="mt-2 text-lg font-bold">
                          <Price
                            amount={
                              item?.price_range?.minimum_price
                                ?.regular_price?.value
                            }
                          />
                        </div>
                      </div>
                    </a>
                  </li>
                ))
                : !isLoading && "No Product Found"}
            </ul>
          )}
        </div>
      </div>
    </PopoverLayout>
  );
};
