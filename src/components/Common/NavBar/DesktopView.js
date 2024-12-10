"use client";
import { Link } from "@/components/ui/Link";

export default function DesktopView({ navBarOptions = [] }) {

  return (
    <>
      <div className="hidden md:flex text-center m-auto">
        <nav className="w-full">
          <ul className="flex p-4">
            {navBarOptions?.map((category) => (
              <li key={category.id} className="relative group px-4">
                <Link href={`/${category.url}`} prefetch={true} className="font-bold py-4 ">
                  {category.name}
                </Link>
                {category.children.length > 0 && (
                  <div className="fixed top-0 left-0 w-screen hidden group-hover:block bg-white shadow-lg p-6 top-auto z-50">
                    <div className=" flex justify-center mt-5">
                      <div className={`grid grid-cols-4 gap-6`}>
                        {category.children.map((childCategory) => (
                          <div key={childCategory.id} className="mr-20 text-start">
                            {childCategory?.children?.length > 0 ?
                              <h3 className="font-bold mb-2"> <Link href={`/${childCategory?.url}`} prefetch={true} > {childCategory.name} </Link> </h3>
                              : <Link href={`/${childCategory?.url}`} prefetch={true} > {childCategory.name} </Link>}
                            <ul className="space-y-2">
                              {childCategory.children.map((subChild) => (
                                <li key={subChild.id}>
                                  <Link
                                    href={`/${subChild.url}`}
                                    className="text-gray-600 hover:underline"
                                    prefetch={true}
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
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
