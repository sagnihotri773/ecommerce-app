import { useRouter } from "next/navigation";

export default function CardSix ({ products }) {
    const router=useRouter()
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
    return (
        <div className="flex flex-col items-center text-center mb-10 cursor-pointer" onClick={() => router.push(`/${products?.url_rewrites?.[0]?.url}`)}>
            <div className="mb-2">
                <span className="box-border inline-block overflow-hidden h-[365px] bg-none opacity-100 border-0 m-0 p-0 relative">
                    <img src={products?.image?.url} alt={products?.name}/>
                </span>
            </div>
            <h2 className="mb-2 text-lg font-medium tracking-wide uppercase">
                {products?.name}
            </h2>
            <div className="mb-2 px-4" dangerouslySetInnerHTML={{
                              __html: descriptionRender(
                                products?.description?.html
                              ),
                            }}>
                
            </div>
            <div className="mt-4 uppercase font-semibold tracking-wide text-xs text-slate-900 bg-white rounded-full px-4 py-3 border border-slate-400 hover:border-black transition ease-linear duration-150">
                Shop Now
            </div>
        </div>
    );
};
