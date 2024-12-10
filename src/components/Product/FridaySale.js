import fridayBanner from "@/assets/Images/fridayBanner.png"
import banner from "@/assets/Images/banner-57.png"
import fridayBanners from "@/assets/Images/Fridaybanner.png"
// import { GrFormNextLink } from "react-icons/gr";

export const FridaySale = () => {
    return (
        <>
            <div className="flex space-x-4 justify-center py-4">
                <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                    <img src={fridayBanner?.src} alt="Large Sale Image" className="h-full cursor-pointer transition-all duration-300 ease-in-out hover:scale-110"
                    />

                    <div className="absolute bottom-6 left-6">
                        <button className="bg-[#e90042] text-white px-6 py-2 uppercase text-sm font-semibold">Shop Now</button>
                    </div>
                </div>

                <div className="flex flex-col space-y-4 w-1/3">
                    <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src={banner?.src}
                            alt="Sale Image"
                            className="w-full h-full object-cover cursor-pointer transition-all duration-300 ease-in-out hover:scale-125"
                        />

                        <div className="absolute top-20 left-6">
                            <span className="text-[#e90042] text-2xl font-semibold">Black Friday</span>
                            <h2 className="text-7xl font-bold text-[#c3c1c0] mt-[9px] mb-[33px] mx-0">Big Sale</h2>
                            {/* <div className="absolute  border border-[#e90042] rounded-full hover:text-[#a749ff] hover:border-[#a749ff]  text-[#e90042] text-3xl">
                                <GrFormNextLink />
                            </div> */}
                        </div>

                    </div>



                    <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src={fridayBanners?.src}
                            alt="Sale Image"
                            className="w-full h-full object-cover cursor-pointer transition-all duration-300 ease-in-out hover:scale-125"
                        />

                        <div className="absolute top-20 left-6">
                            <h3 className="text-[#e90042] text-2xl">BLACK</h3>
                            <h2 className="text-6xl font-extrabold text-[#000] leading-10 mt-[10px] mb-[4px] mx-0">FRIDAY</h2>
                            <p className="text-xl tracking-[6px] font-normal mb-[48px] text-[#000] uppercase">SALE UP TO 50%</p>
                            {/* <div className="absolute  border border-[#e90042] rounded-full hover:text-[#a749ff] hover:border-[#a749ff]  text-[#e90042] text-3xl">
                                <GrFormNextLink />
                            </div> */}
                        </div>

                    </div>



                </div>
            </div>



        </>
    )
}