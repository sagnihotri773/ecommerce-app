"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const BlogSidebar = dynamic(
  () => import("@/components/Common/BlogSidebar/BlogSidebar"),
  {
    ssr: false,
  }
);
export default function Layout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const pathSegments = pathname
    .split("/")
    .filter((segment) => segment)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1));

  return (
    <>

      <section className="w-full bg-[#EFEFEF] py-6 min-h-[50px]">
        <div className="container mx-auto">
          <div className="flex flex-row items-center">
            <nav aria-label="Breadcrumb">
              <ul className="flex items-center space-x-2 text-sm">
                <li className="text-[#444444] text-base hover:text-secondary">
                  <a href="/">Home</a>
                </li>

                {pathSegments.map((segment, index) => (
                  <React.Fragment key={index}>
                    <li className="text-[#444444] hover:text-secondary">
                      <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z" fill="#0F0F0F"></path> </g></svg>
                    </li>
                    <li
                      className={`text-base cursor-pointer ${index === pathSegments.length - 1
                          ? "text-[#444444]"
                          : "text-[#444444]"
                        }`}
                      onClick={() => {
                        if (segment === "Blog") {
                          router.push("/blog");
                        }
                      }}
                    >
                      {segment}
                    </li>
                  </React.Fragment>
                ))}
              </ul>
            </nav>
          </div>
        </div>  
      </section>

      <div className="container m-auto md:flex px-4 md:px-0">
        <div className="w-full md:w-[384px] h-[556px]" key={pathname}>
          <BlogSidebar />
        </div>
        <div className="w-full md:w-3/4">{children}</div>
      </div>
    </>
  );
}
