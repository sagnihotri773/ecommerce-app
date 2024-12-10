"use client";
import Link from "next/link";
import Image from "next/image";

export default function BlogCard({ products }) {

  const trruncateDescription = (description) => {
    if (description?.length > 60) {
      return `${description.substring(0, 60)}...`;
    }
    return description;
  }

  const formatPostDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short'
    });
    return formattedDate;
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-[#E6E6E6]">
      <div className="relative w-full md:w-[358px] min-h-[256px]">
        <Link href={`/blog/post/${products?.url_key}`}>

          <Image
            src={products?.image}
            alt={products?.name || "Blog post image"}
            width={358}
            height={256}
            className="w-full md:h-64 object-cover transition-transform duration-300 hover:scale-110 cursor-pointer"
            sizes="(max-width: 768px) 100vw, 358px"
            priority
            quality={100}
          />
        </Link>
        <div className="absolute top-0 right-0 bg-primary text-black px-4 py-2 text-center">
          <p className="text-2xl">
            {formatPostDate(products?.created_at)?.split(" ")[0]}
          </p>
          <p className="text-sm uppercase">
            {formatPostDate(products?.created_at)?.split(" ")[1]}
          </p>
        </div>
      </div>
      <div className="p-6 text-center">
        <h2 className="text-sm text-center mb-4 min-h-[3rem]">
          {products?.name}
        </h2>
        <p className="text-gray-600 text-center text-sm mb-4 min-h-[2.5rem]">
          {trruncateDescription(products?.short_description)}
        </p>
        <Link
          href={`/blog/post/${products?.url_key}`}
          className="text-black hover:secondary transition-colors text-base font-medium uppercase"
        >
          Read more about{" "}
          {products?.name?.length > 30
            ? `${products?.name.substring(0, 30)}...`
            : products?.name}
        </Link>
      </div>
    </div>

  );
}
