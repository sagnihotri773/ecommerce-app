"use client";

import { GET_BLOG_MONTHLY_ARCHIEVE_BY_MONTH } from "@/lib/graphql/queries/blog";
import { useQuery } from "@apollo/client";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
const BlogCard = dynamic(() => import('@/components/Blog/Card'), {
  ssr: false
});
export default function BlogMonth() {
  const { month } = useParams();
  const [hasData, setHasData] = useState(false);

  const [year, monthNumber] = month.split("-");
  const { data: getTagPost, loading } = useQuery(
    GET_BLOG_MONTHLY_ARCHIEVE_BY_MONTH,
    { variables: { monthly: monthNumber, year: year } }
  );
  const [getPostByTag, setGetPostByTag] = useState([]);

  useEffect(() => {
    if (getTagPost && getTagPost.mpBlogMonthlyArchive.items?.[0]?.items) {
      setGetPostByTag(getTagPost.mpBlogMonthlyArchive.items[0].items);
    }
    if (!loading && getTagPost?.mpBlogMonthlyArchive?.items?.length > 0) {
      setHasData(true);
    } else {
      setHasData(false);
    }
  }, [getTagPost, loading]);
  return (
    <div className="flex md:py-32 py-6 md:px-7 w-full">
      {loading ? (
        <div className="md:flex w-full  gap-6 px-3">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="group relative flex-1 overflow-hidden">
              <div>
                <div className="bg-gray-300 w-full min-h-[300px] h-[300px] animate-pulse"></div>
                <div className="mt-6">
                  <div className="flex mb-4">
                    <div className="w-16 h-4 bg-gray-300 animate-pulse"></div>
                  </div>
                  <div className="w-1/2 h-6 bg-gray-300 animate-pulse"></div>
                  <p className="w-full h-4 bg-gray-300 mt-2 animate-pulse"></p>
                  <div className="mt-3">
                    <span className="w-24 h-4 bg-gray-300 animate-pulse"></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : hasData ? (
        <div className="group relative overflow-hidden grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 px-3">
          {getPostByTag.map((item) => (
            <BlogCard key={item.id} products={item} />
          ))}
        </div>
      ) : (
        <div className="h-[300px] w-full text-center w-full mt-32">
          <h3 className="text-3xl">No blog posts available</h3>
        </div>
      )}
    </div>
  );
}
