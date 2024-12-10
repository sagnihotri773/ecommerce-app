import { client } from "@/lib/graphql/apolloClient";
import {
  BLOG_FILTER_BY_NAME,
  GET_BLOG_MONTHLY_ARCHIEVE,
  GET_BLOG_POST,
  GET_BLOGS_CATEGORY,
  GET_POST_BY_TOPIC,
  GET_TAG_LIST,
} from "@/lib/graphql/queries/blog";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BlogSidebar() {
  const { data: getBlogCategory, loading: loadingCategory } =
    useQuery(GET_BLOGS_CATEGORY);
  const { data: getBlogTagLIst, loading: loadingTags } = useQuery(GET_TAG_LIST);
  const { data: getPostByTopic, loading: loadingTopics } =
    useQuery(GET_POST_BY_TOPIC);
  const { data: getBlogMonthlyArchieve, loading: loadingArchives } = useQuery(
    GET_BLOG_MONTHLY_ARCHIEVE
  );
  const { data: blogPostData, loading: loadingPosts } = useQuery(
    GET_BLOG_POST,
    {
      variables: { currentPage: 1, pageSize: 3 },
    }
  );

  const [getBlogCategoryList, setGetBlogCategoryList] = useState([]);
  const [getBlogTagList, setBlogTagList] = useState([]);
  const [getPostTopic, setGetPostTopic] = useState([]);
  const [getMonthlyArchieve, setGetMonthlyArchieve] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    setLoading(
      loadingPosts ||
      loadingCategory ||
      loadingTags ||
      loadingTopics ||
      loadingArchives
    );
  }, [
    loadingPosts,
    loadingCategory,
    loadingTags,
    loadingTopics,
    loadingArchives,
  ]);

  const router = useRouter();

  useEffect(() => {
    setGetBlogCategoryList(getBlogCategory?.mpBlogCategories?.items);
    setBlogTagList(getBlogTagLIst?.mpBlogTags?.items);
    setGetPostTopic(getPostByTopic?.mpBlogTopics?.items);
    setGetMonthlyArchieve(getBlogMonthlyArchieve?.mpBlogMonthlyArchive?.items);
  }, [getBlogCategory, getBlogTagLIst, getPostByTopic, getBlogMonthlyArchieve]);

  const fetchSearchResults = async (search) => {
    try {
      const { data: searchResults, loading } = await client.query({
        query: BLOG_FILTER_BY_NAME,
        variables: { name: search },
        fetchPolicy: "no-cache",
      });
      setSearchData(searchResults?.mpBlogPosts?.items || []);
      setLoading(loading);
    } catch (error) {
      console.error(error);
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
        setHasSearched(true);
      } else {
        setSearchData([]);
        setHasSearched(false);
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
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setSearchInput("");
        setSearchData([]);
        setHasSearched(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // const Skeleton = () => {
  //   return (
  //     <div className="sidebar-widget h-auto mt-11 col-lg-3 py-16">
  //       <h4 className="pro-sidebar-title font-bold text-lg bg-gray-300 animate-pulse h-6 mb-4"></h4>
  //       <div className="sidebar-widget-list sidebar-widget-list--blog py-3">
  //         <ul>
  //           {[...Array(3)].map((_, index) => (
  //             <li key={index} className="h-[100px] mb-3">
  //               <div className="flex gap-6 items-center text-gray-500 h-[100px]">
  //                 <div className="bg-gray-300 w-6 h-6 rounded animate-pulse"></div>
  //                 <div className="bg-gray-300 w-32 h-4 rounded animate-pulse"></div>
  //               </div>
  //             </li>
  //           ))}
  //         </ul>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <>
      <div className={`col-lg-3 md:py-0 py-6 md:pt-[60px] min-h-[556px]`}>
        <div className="sidebar-widget ">
          <h4 className="pro-sidebar-title font-bold">Search</h4>
          <div className="pro-sidebar-search mb-6 mt-6">
            <form className="pro-sidebar-search-form flex items-center border border-gray-300 rounded">
              <input
                type="text"
                placeholder="Search here..."
                className="flex-grow md:px-4 py-2 border-none outline-none"
                onChange={handleInputChange}
                value={searchInput}
              />
              <div className="px-4 py-2 text-gray-500 border-l border-gray-300 md:block hidden cursor-pointer">
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clip-path="url(#clip0_15_152)"> <rect width="24" height="24" fill="white"></rect> <circle cx="10.5" cy="10.5" r="6.5" stroke="#000000" stroke-linejoin="round"></circle> <path d="M19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L19.6464 20.3536ZM20.3536 19.6464L15.3536 14.6464L14.6464 15.3536L19.6464 20.3536L20.3536 19.6464Z" fill="#000000"></path> </g> <defs> <clipPath id="clip0_15_152"> <rect width="24" height="24" fill="white"></rect> </clipPath> </defs> </g></svg>
              </div>
            </form>
          </div>
        </div>

        {hasSearched && (
          <div
            className="absolute items-start md:w-[290px] top-[83px] mt-2 bg-white shadow-lg border border-gray-200 rounded z-10"
            style={{
              minHeight: "150px", // Reserve space
              visibility: hasSearched && searchData?.length > 0 ? "visible" : "hidden",
              opacity: hasSearched && searchData?.length > 0 ? 1 : 0,
              transition: "opacity 0.3s ease-out"
            }}
          >
            {searchData?.length > 0 ? (
              <div className="search-results flex flex-col">
                {searchData.map((item) => (
                  <div key={item?.url_key} className="flex mb-4 z-20">
                    <div className="w-1/3 flex-shrink-0">
                      <img
                        src={item?.image}
                        alt={item?.name}
                        width={150} // Set width explicitly
                        height={150} // Set height explicitly
                        className="w-full h-auto rounded-lg object-cover cursor-pointer"
                        onClick={() =>
                          router.push(`/blog/post/${item?.url_key}`)
                        }
                        style={{ width: "150px", height: "150px" }}
                      />
                    </div>

                    <div
                      className="ml-4 flex flex-col cursor-pointer z-30"
                      onClick={() =>
                        router.push(`/blog/post/${item?.url_key}`)
                      }
                    >
                      <p className="font-bold text-gray-800">
                        {item?.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {isReadMore
                          ? item?.short_description
                          : `${item?.short_description?.substring(
                            0,
                            100
                          )}...`}
                        {item?.short_description?.length > 100 && (
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsReadMore((prev) => !prev);
                            }}
                            className="text-blue-500 cursor-pointer ml-1"
                          >
                            {isReadMore ? " Read Less" : " Read More"}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative  p-4  z-10">
                <p className="text-gray-500">No Blog Found</p>
              </div>
            )}
          </div>
        )}

        <>
          {loadingCategory ? (
            <div className="sidebar-widget mt-35 min-h-[100px]">
              <h4 className="pro-sidebar-title font-bold bg-gray-300 animate-pulse h-6 mb-4"></h4>
              <div className="sidebar-widget-list sidebar-widget-list--blog py-3">
                <ul>
                  {[...Array(3)].map((_, index) => (
                    <li
                      key={index}
                      className="flex gap-6 items-center text-gray-500 h-[40px]"
                    >
                      <div className="bg-gray-300 w-6 h-6 rounded animate-pulse"></div>
                      <div className="bg-gray-300 w-32 h-4 rounded animate-pulse"></div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <>
              {getBlogCategory?.mpBlogCategories?.items?.length > 0 && (
                <aside className="sidebar-widget mt-35 min-h-[100px]">
                  <h4 className="pro-sidebar-title font-bold">Categories</h4>
                  <ul className="sidebar-widget-list sidebar-widget-list--blog py-3">
                    {getBlogCategory?.mpBlogCategories?.items.map((item, index) => (
                      <li key={index} className="flex gap-6 items-center text-gray-500 cursor-pointer">
                        <svg width={"18px"} height={"18px"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M1 5C1 3.34315 2.34315 2 4 2H8.55848C9.84977 2 10.9962 2.82629 11.4045 4.05132L11.7208 5H20C21.1046 5 22 5.89543 22 7V9.00961C23.1475 9.12163 23.9808 10.196 23.7695 11.3578L22.1332 20.3578C21.9603 21.3087 21.132 22 20.1654 22H3C1.89543 22 1 21.1046 1 20V5ZM20 9V7H11.7208C10.8599 7 10.0956 6.44914 9.82339 5.63246L9.50716 4.68377C9.37105 4.27543 8.98891 4 8.55848 4H4C3.44772 4 3 4.44772 3 5V12.2709L3.35429 10.588C3.54913 9.66249 4.36562 9 5.31139 9H20ZM3.36634 20C3.41777 19.9109 3.4562 19.8122 3.47855 19.706L5.31139 11L21 11H21.8018L20.1654 20L3.36634 20Z" fill="gray"></path> </g></svg>
                        <span onClick={() => router.push(`/blog/category/${item?.url_key}`)}>
                          {item?.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </aside>
              )}

            </>
          )}

          {loadingTopics ? (
            <div className="sidebar-widget mt-35" style={{ minHeight: "150px" }}>
              <h4
                className="pro-sidebar-title font-bold bg-gray-300 animate-pulse mb-4"
                style={{ height: "24px", width: "60%" }} // Matches title size
              ></h4>
              <div className="sidebar-widget-list sidebar-widget-list--blog py-3">
                <ul>
                  {[...Array(3)].map((_, index) => (
                    <li
                      key={index}
                      className="flex gap-6 items-center"
                      style={{ height: "40px" }} // Matches content size
                    >
                      <div
                        className="bg-gray-300 rounded animate-pulse"
                        style={{ width: "24px", height: "24px" }} // Matches icon size
                      ></div>
                      <div
                        className="bg-gray-300 rounded animate-pulse"
                        style={{ width: "128px", height: "16px" }} // Matches text size
                      ></div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          ) : (
            <>
              {getPostTopic?.length > 0 && (
                <aside className="sidebar-widget mt-35">
                  <h4 className="pro-sidebar-title font-bold">Topics</h4>
                  <ul className="sidebar-widget-list sidebar-widget-list--blog py-3">
                    {getPostTopic.map((item, index) => (
                      <li key={index} className="flex gap-6 text-gray-500 items-center cursor-pointer">
                        <svg width={"18px"} height={"18px"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M1 5C1 3.34315 2.34315 2 4 2H8.55848C9.84977 2 10.9962 2.82629 11.4045 4.05132L11.7208 5H20C21.1046 5 22 5.89543 22 7V9.00961C23.1475 9.12163 23.9808 10.196 23.7695 11.3578L22.1332 20.3578C21.9603 21.3087 21.132 22 20.1654 22H3C1.89543 22 1 21.1046 1 20V5ZM20 9V7H11.7208C10.8599 7 10.0956 6.44914 9.82339 5.63246L9.50716 4.68377C9.37105 4.27543 8.98891 4 8.55848 4H4C3.44772 4 3 4.44772 3 5V12.2709L3.35429 10.588C3.54913 9.66249 4.36562 9 5.31139 9H20ZM3.36634 20C3.41777 19.9109 3.4562 19.8122 3.47855 19.706L5.31139 11L21 11H21.8018L20.1654 20L3.36634 20Z" fill="gray"></path> </g></svg>

                        <span onClick={() => router.push(`/blog/topic/${item?.name}?topicId=${item?.topic_id}`)}>
                          {item?.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </aside>
              )}

            </>
          )}

          {loadingTags ? (
            <div className="sidebar-widget h-[86px]">
              <h4 className="pro-sidebar-title font-bold"> <div className="bg-gray-300 animate-pulse h-6 w-10" /> </h4>
              <div className="sidebar-widget-tag mt-25">
                <div className="flex gap-6 py-4">
                  {[...Array(1)].map((_, index) => (
                    <div
                      key={index}
                      className="flex w-[100px] h-[30px] bg-gray-300 rounded animate-pulse"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {getBlogTagList?.length > 0 && (
                <div className="sidebar-widget">
                  <h4 className="pro-sidebar-title font-bold">Tag</h4>
                  <div className="sidebar-widget-tag mt-25">
                    <div className="gap-6 py-4">
                      {getBlogTagList?.map((item, index) => (
                        <div
                          key={index}
                          className="flex"
                          onClick={() =>
                            router.push(`/blog/tag/${item?.name}`)
                          }
                        >
                          <div className="border border-gray-300 py-2 w-[100px] h-[30px] px-2 cursor-pointer bg-white text-sm text-gray-500">
                            {item?.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {loadingArchives ? (
            <>
              <h4 className="pro-sidebar-title font-bold bg-gray-300 animate-pulse h-6 mb-4"></h4>
              {[...Array(1)].map((_, index) => (
                <div
                  key={index}
                  className="flex py-4 gap-3 text-gray-500 items-center cursor-pointer"
                >
                  <div className="bg-gray-300 w-6 h-6 rounded animate-pulse"></div>
                  <div className="bg-gray-300 w-32 h-4 rounded animate-pulse"></div>
                </div>
              ))}
            </>
          ) : (
            <>
              {getMonthlyArchieve?.length > 0 && (
                <aside className="sidebar-widget ">
                  <h4 className="pro-sidebar-title font-bold">Monthly Archive</h4>
                  <ul className="sidebar-widget-list sidebar-widget-list--blog py-3">
                    {getMonthlyArchieve.map((item) => {
                      const [monthName, year] = item?.label.split(", ");
                      const monthIndex = new Date(`${monthName} 1, 2021`).getMonth() + 1;
                      const formattedMonth = monthIndex < 10 ? `0${monthIndex}` : monthIndex;

                      return (
                        <li
                          key={item?.label}
                          className="flex gap-3 text-gray-500 items-center cursor-pointer"
                        >
                          <svg
                            fill="#000000"
                            width="18px"
                            height="18px"
                            viewBox="0 0 1024 1024"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                              <path d="M266.815 537.708c0 22.62-18.34 40.96-40.96 40.96s-40.96-18.34-40.96-40.96 18.34-40.96 40.96-40.96 40.96 18.34 40.96 40.96zm182.77 0c0 22.62-18.34 40.96-40.96 40.96s-40.96-18.34-40.96-40.96 18.34-40.96 40.96-40.96 40.96 18.34 40.96 40.96zm182.775 0c0 22.62-18.34 40.96-40.96 40.96s-40.96-18.34-40.96-40.96 18.34-40.96 40.96-40.96 40.96 18.34 40.96 40.96zm182.77 0c0 22.62-18.34 40.96-40.96 40.96s-40.96-18.34-40.96-40.96 18.34-40.96 40.96-40.96 40.96 18.34 40.96 40.96zM266.815 679.347c0 22.62-18.34 40.96-40.96 40.96s-40.96-18.34-40.96-40.96 18.34-40.96 40.96-40.96 40.96 18.34 40.96 40.96zm182.77 0c0 22.62-18.34 40.96-40.96 40.96s-40.96-18.34-40.96-40.96 18.34-40.96 40.96-40.96 40.96 18.34 40.96 40.96zm182.775 0c0 22.62-18.34 40.96-40.96 40.96s-40.96-18.34-40.96-40.96 18.34-40.96 40.96-40.96 40.96 18.34 40.96 40.96zm182.77 0c0 22.62-18.34 40.96-40.96 40.96s-40.96-18.34-40.96-40.96 18.34-40.96 40.96-40.96 40.96 18.34 40.96 40.96zM266.815 820.988c0 22.62-18.34 40.96-40.96 40.96s-40.96-18.34-40.96-40.96 18.34-40.96 40.96-40.96 40.96 18.34 40.96 40.96zm182.77 0c0 22.62-18.34 40.96-40.96 40.96s-40.96-18.34-40.96-40.96 18.34-40.96 40.96-40.96 40.96 18.34 40.96 40.96zm182.775 0c0 22.62-18.34 40.96-40.96 40.96s-40.96-18.34-40.96-40.96 18.34-40.96 40.96-40.96 40.96 18.34 40.96 40.96zm182.77 0c0 22.62-18.34 40.96-40.96 40.96s-40.96-18.34-40.96-40.96 18.34-40.96 40.96-40.96 40.96 18.34 40.96 40.96zM228.18 81.918v153.6c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48v-153.6c0-11.311-9.169-20.48-20.48-20.48s-20.48 9.169-20.48 20.48zm528.09 0v153.6c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48v-153.6c0-11.311-9.169-20.48-20.48-20.48s-20.48 9.169-20.48 20.48z"></path>
                              <path d="M890.877 137.517c33.931 0 61.44 27.509 61.44 61.44v703.375c0 33.931-27.509 61.44-61.44 61.44h-757.76c-33.931 0-61.44-27.509-61.44-61.44V198.957c0-33.931 27.509-61.44 61.44-61.44h757.76zm-757.76 40.96c-11.309 0-20.48 9.171-20.48 20.48v703.375c0 11.309 9.171 20.48 20.48 20.48h757.76c11.309 0 20.48-9.171 20.48-20.48V198.957c0-11.309-9.171-20.48-20.48-20.48h-757.76z"></path>
                              <path d="M575.03 338.288c0-33.93-27.51-61.44-61.44-61.44s-61.44 27.51-61.44 61.44c0 33.93 27.51 61.44 61.44 61.44s61.44-27.51 61.44-61.44zm40.96 0c0 56.551-45.849 102.4-102.4 102.4s-102.4-45.849-102.4-102.4c0-56.551 45.849-102.4 102.4-102.4s102.4 45.849 102.4 102.4z"></path>
                            </g>
                          </svg>
                          <span
                            onClick={() =>
                              router.push(`/blog/month/${year}-${formattedMonth}`)
                            }
                          >
                            {item?.label} {`(${item?.quantity})`}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </aside>
              )}

            </>
          )}
        </>
      </div>
    </>
  );
}
