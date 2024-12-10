import { aboutUsUrl, checkOutUrl, contactUsUrl, loginUrl, shopCartUrl } from "@/components/RouteManager";
import { selectStoreInfo } from "@/lib/redux/slices/storeConfig";
// import { CiLocationOn, CiMail, CiTwitter } from "react-icons/ci";
// import { FaFacebookSquare, FaLinkedin, FaWhatsapp } from "react-icons/fa";
// import { IoLogoInstagram } from "react-icons/io5";
import { useSelector } from "react-redux";

const footerData = [
    {
        title: "Category",
        links: [
            { name: "Dairy Milk", href: "#" },
            { name: "Snack & Spice", href: "#" },
            { name: "Fast Food", href: "#" },
            { name: "Juice & Drinks", href: "#" },
            { name: "Bakery", href: "#" },
            { name: "Seafood", href: "#" },
        ]
    },
    {
        title: "Company",
        links: [
            { name: "About us", href: aboutUsUrl },
            { name: "Delivery", href: "#" },
            { name: "Legal Notice", href: "#" },
            { name: "Terms & conditions", href: "#" },
            { name: "Secure payment", href: checkOutUrl },
            { name: "Contact us", href: contactUsUrl },
        ]
    },
    {
        title: "Account",
        links: [
            { name: "Sign In", href: loginUrl },
            { name: "View Cart", href: shopCartUrl },
            { name: "Return Policy", href: "#" },
            { name: "Become a Vendor", href: "#" },
            { name: "Affiliate Program", href: "#" },
            { name: "Payments", href: "#" },
        ]
    }
];

export const FooterStyleTwo = () => {
  const storeLogoUrl = useSelector((state) => selectStoreInfo(state, "logo"));
  const copyright = useSelector((state) => selectStoreInfo(state, "copyright"));

    return (
        <div className="footer-container border-t-[1px] border-solid border-[#eee]">
            <div className="footer-top py-[50px] max-[1199px]:py-[35px]">
                <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
                    <div className="flex flex-wrap w-full max-[991px]:mb-[-30px] aos-init aos-animate">
                        <div className="min-[992px]:w-[25%] max-[991px]:w-full w-full px-[12px] bb-footer-toggle bb-footer-cat">
                            <div className="bb-footer-widget bb-footer-company flex flex-col max-[991px]:mb-[24px]">
                                <img
                                    src={storeLogoUrl}
                                    className="bb-footer-logo max-w-[144px] mb-[30px] max-[767px]:max-w-[130px]"
                                />
                                <p className="bb-footer-detail max-w-[400px] mb-[30px] p-[0] font-Poppins text-[14px] leading-[27px] font-normal text-[#686e7d] inline-block relative max-[1399px]:text-[15px] max-[1199px]:text-[14px]">
                                   {copyright}
                                </p>
                                <div className="bb-app-store m-[-7px] flex flex-wrap">
                                    <div>
                                        <img
                                            src="https://maraviyainfotech.com/projects/blueberry-tailwind/assets/img/app/android.png"
                                            className="adroid max-w-[140px] m-[7px] rounded-[5px] max-[1399px]:max-w-[120px]"
                                        />
                                    </div>
                                    <div>
                                        <img
                                            src="https://maraviyainfotech.com/projects/blueberry-tailwind/assets/img/app/android.png"
                                            className="adroid max-w-[140px] m-[7px] rounded-[5px] max-[1399px]:max-w-[120px]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {footerData.map((section, index) => (
                            <div key={index} className="min-[992px]:w-[16.66%] max-[991px]:w-full w-full px-[12px] bb-footer-toggle">
                                <div className="bb-footer-widget">
                                    <h4 className="bb-footer-heading font-quicksand leading-[1.2] text-[18px] font-bold mb-[20px] text-[#3d4750] tracking-[0] relative block w-full pb-[15px] capitalize border-b-[1px] border-solid border-[#eee] max-[991px]:text-[14px]">
                                        {section.title}
                                        <div className="bb-heading-res">
                                            <i className="ri-arrow-down-s-line" />
                                        </div>
                                    </h4>
                                    <div className="bb-footer-links bb-footer-dropdown max-[991px]:mb-[35px]">
                                        <ul className="align-items-center">
                                            {section.links.map((link, linkIndex) => (
                                                <li key={linkIndex} className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                                                    <a
                                                        href={link.href}
                                                        className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                                                    >
                                                        {link.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="min-[992px]:w-[25%] max-[991px]:w-full w-full px-[12px] bb-footer-toggle bb-footer-cont-social">
                            <div className="bb-footer-contact mb-[30px]">
                                <div className="bb-footer-widget">
                                    <h4 className="bb-footer-heading font-quicksand leading-[1.2] text-[18px] font-bold mb-[20px] text-[#3d4750] tracking-[0] relative block w-full pb-[15px] capitalize border-b-[1px] border-solid border-[#eee] max-[991px]:text-[14px]">
                                        Contact
                                        <div className="bb-heading-res">
                                            <i className="ri-arrow-down-s-line" />
                                        </div>
                                    </h4>
                                    <div className="bb-footer-links bb-footer-dropdown max-[991px]:mb-[35px]">
                                        <ul className="align-items-center">
                                            <li className="bb-footer-link bb-foo-location flex items-start max-[991px]:mb-[15px] mb-[16px]">
                                                {/* <span className="mt-[5px] w-[25px] basis-[auto] grow-[0] shrink-[0]">
                                                    <CiLocationOn className="ri-map-pin-line leading-[0] text-[18px] text-[#6c7fd8]" />
                                                </span> */}
                                                <p className="m-[0] font-Poppins text-[14px] text-[#686e7d] font-normal leading-[28px] tracking-[0.03rem]">
                                                    971 Lajamni, Motavarachha, Surat, Gujarat, Bharat
                                                    394101.
                                                </p>
                                            </li>
                                            <li className="bb-footer-link bb-foo-call flex items-start max-[991px]:mb-[15px] mb-[16px]">
                                                {/* <span className="w-[25px] basis-[auto] grow-[0] shrink-[0]">
                                                    <FaWhatsapp className="ri-whatsapp-line leading-[0] text-[18px] text-[#6c7fd8]" />
                                                </span> */}
                                                <a
                                                    href="tel:+009876543210"
                                                    className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] inline-block relative break-all tracking-[0] font-normal max-[1399px]:text-[15px] max-[1199px]:text-[14px]"
                                                >
                                                    +00 9876543210
                                                </a>
                                            </li>
                                            <li className="bb-footer-link bb-foo-mail flex">
                                                {/* <span className="w-[25px] basis-[auto] grow-[0] shrink-[0]">
                                                    <CiMail className="ri-mail-line leading-[0] text-[18px] text-[#6c7fd8]" />
                                                </span> */}
                                                <a
                                                    href="mailto:example@email.com"
                                                    className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20 px] text-[#686e7d] inline-block relative break-all tracking-[0] font-normal max-[1399px]:text-[15px] max-[1199px]:text-[14px]"
                                                >
                                                    example@email.com
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="bb-footer-social">
                                <div className="bb-footer-widget">
                                    <div className="bb-footer-links bb-footer-dropdown max-[991px]:mb-[35px]">
                                        <ul className="align-items-center flex flex-wrap items-center">
                                            <li className="bb-footer-link leading-[1.5] flex items-center pr-[5px]">
                                                <a
                                                    href="#"
                                                    className="transition-all text-white duration-[0.3s] ease-in-out w-[30px] h-[30px] rounded-[5px] bg-[#3d4750] hover:bg-[#6c7fd8] capitalize flex items-center justify-center text-[15px] leading-[20px] relative break-all font-normal"
                                                >
                                                    {/* <FaFacebookSquare /> */}
                                                </a>
                                            </ li>
                                            <li className="bb-footer-link leading-[1.5] flex items-center pr-[5px]">
                                                <a
                                                    href="#"
                                                    className="transition-all text-white duration-[0.3s] ease-in-out w-[30px] h-[30px] rounded-[5px] bg-[#3d4750] hover:bg-[#6c7fd8] capitalize flex items-center justify-center text-[15px] leading-[20px] relative break-all font-normal"
                                                >
                                                    {/* <CiTwitter /> */}
                                                </a>
                                            </li>
                                            <li className="bb-footer-link leading-[1.5] flex items-center pr-[5px]">
                                                <a
                                                    href="#"
                                                    className="transition-all text-white duration-[0.3s] ease-in-out w-[30px] h-[30px] rounded-[5px] bg-[#3d4750] hover:bg-[#6c7fd8] capitalize flex items-center justify-center text-[15px] leading-[20px] relative break-all font-normal"
                                                >
                                                    {/* <FaLinkedin /> */}
                                                </a>
                                            </li>
                                            <li className="bb-footer-link leading-[1.5] flex items-center pr-[5px]">
                                                <a
                                                    href="#"
                                                    className="transition-all text-white duration-[0.3s] ease-in-out w-[30px] h-[30px] rounded-[5px] bg-[#3d4750] hover:bg-[#6c7fd8] capitalize flex items-center justify-center text-[15px] leading-[20px] relative break-all font-normal"
                                                >
                                                    {/* <IoLogoInstagram /> */}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};