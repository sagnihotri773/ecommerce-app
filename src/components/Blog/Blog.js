"use client";

import React, { useState, useEffect, useMemo } from "react";
import { GET_BLOG_POST } from "@/lib/graphql/queries/blog";
import dynamic from "next/dynamic";
import { client } from "@/lib/graphql/apolloClient";

const Pagination = dynamic(() => import('@/components/Common/Pagination/index'));
const BlogCard = dynamic(() => import('@/components/Blog/Card'));
export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogPostData, setBlogPostData] = useState(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const { data } = await client.query({
          query: GET_BLOG_POST,
          variables: { currentPage: currentPage, pageSize: 20 },
          fetchPolicy: 'no-cache',
        });

        setBlogPostData(data?.mpBlogPosts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchBlogPosts();
  }, [currentPage]);

  const totalPages = useMemo(() => {
    if (blogPostData?.total_count && blogPostData?.pageInfo?.pageSize) {
      return Math.ceil(
        blogPostData?.total_count /
        blogPostData?.pageInfo?.pageSize
      );
    }
    return 0; 
  }, [blogPostData]);

  console.log("blogContent123")
  return (
    <div className="w-full">
      {blogPostData?.items?.length === 0 ? (
        <section className="relative md:pt-[60px] py-6">
        <div className="container m-auto relative md:px-3">
        <div className="w-28 h-6 bg-gray-200 animate-pulse mb-1"></div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 ">
            {[1, 2, 3]?.map((item, index) => (
              <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-[#E6E6E6]" key={index}>
                <div className="relative">
                <div className="w-full h-64 bg-gray-200 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      ) : (
        <>
          <section className="relative md:pt-[60px] py-6 min-h-screen">
            <div className="container m-auto relative">
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 md:px-3 ">
                {blogPostData?.items?.map((item) => (
                  <BlogCard key={item.id} products={item} />
                ))}
              </div>
            </div>
          </section>

          {blogPostData?.total_count > 20 && (
            <div className="py-4 min-h-[80px]">
              <Pagination
                currentPage={blogPostData?.pageInfo?.currentPage}
                totalPages={totalPages} // Using memoized totalPages
                onPageChange={setCurrentPage} // Passing setCurrentPage to handle page changes
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
