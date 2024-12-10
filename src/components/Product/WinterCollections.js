import Image from "next/image"
import Link from "next/link";
import WinterOne from '@/assets/Images/winter01.webp';
import WinterTwo from '@/assets/Images/winter2.webp';
import WinterThree from '@/assets/Images/winter3.jpg';

export default function WinterCollection() {
    const collections = [
        {
            title: "Knitwear - Keep warm in winter",
            image: WinterOne,
            promo: "Soak up the sun with 30% off selected swimwear",
            href: "/shop",
        },
        {
            title: "Home Run Varsity Bomber",
            image: WinterTwo,
            promo: "Soak up the sun with 30% off selected swimwear",
            overlay: "New collection",
            href: "/shop",
        },
        {
            title: "Winter accessories",
            image: WinterThree,
            promo: "50% off all accessories and summer clothes",
            overlay: "Best accessories",
            href: "/shop",
        },
    ]

    if (collections.length == 0) {
        return null
    }

    return (
        <div className="container m-auto md:py-24 py-10 px-4 md:px-0">
            <div className="flex justify-between items-center mb-8 group/edit">
                <h2 className="md:text-4xl text-2xl font-normal">Winter Collections</h2>
                <Link href="/shop" className="text-sm text-gray-600 hover:text-gray-900 hover:text-[#b5876d]">
                    See More
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#b5876d] transition-all duration-300 group-hover/edit:w-full"></span>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {collections.map((collection) => (
                    <div key={collection.title} className="group">
                        <div className="relative aspect-[3/4] mb-4 overflow-hidden">
                            {/* <Image
                                src={collection.image}
                                alt={collection.title}
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                layout="responsive"  // Ensures image maintains aspect ratio
                                width={500}  // Adjust width as needed
                                height={667}  // Adjust height as needed
                                priority
                            /> */}
                             <Image
                                src={collection.image}
                                alt={collection.title}
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                fill // Ensures the image fills the reserved space
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive sizes for better performance
                                priority
                            />
                        </div>

                        <h3 className="text-2xl font-normal md:mb-2 md:py-2 py-1">{collection.title}</h3>
                        <p className="text-1xl text-gray-600 md:mb-3 md:py-2 py-1">{collection.promo}</p>
                        <Link
                            href={collection.href}
                            className="inline-block md:text-1xl text-1xl text-sm font-normal text-black hover:text-[#b5876d] transition-colors group/item relative"
                        >
                            View More
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#b5876d] transition-all duration-300 group-hover/item:w-full"></span>
                        </Link>
                    </div>
                ))}
            </div>
            <hr />
        </div>
    )
}
