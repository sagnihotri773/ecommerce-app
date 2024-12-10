
import dynamic from 'next/dynamic';
const Price = dynamic(() => import('@/components/Currency/Price'), { ssr: false });
const RatingComponent = dynamic(() => import('@/components/Common/Rating/Rating'), { ssr: false });

export default function ProductSummaryThree({ data, price }) {
  const descriptionRender = (value = "") => {
    const unescapedHtml = value
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'");

    return unescapedHtml;
  };
  return (
    <div className="w-full">
      <div className="flex w-full items-start justify-between space-x-8 rtl:space-x-reverse">
        <h1 className="text-lg font-semibold tracking-tight text-heading md:text-xl xl:text-2xl cursor-pointer transition-colors hover:text-accent">
          {data?.name}
        </h1>

      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="block text-sm font-normal text-body">{data?.sku}</span>
        <div className="inline-flex shrink-0 items-center rounded border border-accent bg-accent text-green-600 px-3 py-1 text-sm text-white">
          <RatingComponent value={data?.rating_summary} />
        </div>
      </div>
      <div className="mt-3 text-sm leading-7 text-body md:mt-4 react-editor-description">
        <div
          dangerouslySetInnerHTML={{
            __html: descriptionRender(data?.description?.html),
          }}
        ></div>
      </div>
      <span className="my-5 flex items-center md:my-10 text-green-600 text-3xl font-bold">
        <Price amount={price} />
      </span>
    </div>
  );
};
