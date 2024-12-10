// import { CiMail, CiTwitter } from 'react-icons/ci';
// import { FaInstagram } from 'react-icons/fa6';
// import { SlSocialFacebook } from "react-icons/sl";
// import { FiMessageSquare, FiPhone } from "react-icons/fi";

// Static data arrays
const productCategories = [
    { title: "Products", items: ["Eyeglasses", "Sunglasses", "Contacts", "New collections", "Scout by Warby Parker", "Accessories", "Gift cards"] },
    { title: "Shop Online", items: ["Try 5 for free", "Download our app", "Get a prescription", "Book an eye exam", "Renew a prescription", "Measure your PD", "Visit a store", "Find a location"] },
    { title: "Ways to save", items: ["Insurance", "Flexible spending", "20% off contacts", "Add a pair and save", "Education", "Eyeglasses lens guide", "Sunglasses lens guide", "Eyewear A to Z", "How our glasses are made"] },
    { title: "About us", items: ["Our story", "Buy a Pair, Give a Pair", "Customer reviews", "Jobs", "Impact", "Impact Foundation", "Investors", "Sitemap"] }
];

// const contactMethods = [
//     { icon: <FiPhone className="h-6 w-6" />, label: "FAQ" },
//     { icon: <FiMessageSquare className="h-6 w-6" />, label: "Text" },
//     { icon: <FiMessageSquare className="h-6 w-6" />, label: "Chat" },
//     { icon: <CiMail className="h-6 w-6" />, label: "Email" }
// ];

// const socialMediaLinks = [
//     { icon: <SlSocialFacebook className="h-6 w-6" />, label: "Facebook", href: "#" },
//     { icon: <CiTwitter className="h-6 w-6" />, label: "Twitter", href: "#" },
//     { icon: <FaInstagram className="h-6 w-6" />, label: "Instagram", href: "#" }
// ];

export const StyleFour = () => {
    return (
        <div className="bg-[#F8F8F8]">
            <div className="border-b-[1px] border-b-[#E1E5E6]">
                <div className="w-full">
                    <div className="md:grid grid-cols-12 gap-6 mx-12 place-items-stretch md:flex items-center py-6 gap-4">
                        <div className="col-start-2 col-end-8">
                            <span>
                                <p className="text-2xl text-gray-600">Get the inside scoop on new frames, events, and more</p>
                            </span>
                        </div>
                        <div className="grid col-start-8 col-end-12">
                            <form className="grid">
                                <input className="h-[60px] bg-white w-full border border-[#E1E5E6] rounded-lg focus:outline-none focus:border-transparent" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="bg-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="container m-auto">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        {productCategories.map((category, index) => (
                            <div key={index}>
                                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">{category.title}</h3>
                                <ul className="space-y-2">
                                    {category.items.map((item) => (
                                        <li key={item}>
                                            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">{item}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        <div className="m-auto py-3 justify-between items-center">
                            <div className="mb-4 md:mb-0">
                                <h3 className="text-sm font-semibold text-gray-900">Need a hand?</h3>
                                <p className="text-sm text-gray-600">We're available by phone (888.492.7297) and chat today from 8 a.m.–11 p.m. ET</p>
                            </div>
                            {/* <div className="flex space-x-6 mt-5">
                                {contactMethods.map((method, index) => (
                                    <a key={index} href="#" className="text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">{method.label}</span>
                                        {method.icon}
                                    </a>
                                ))}
                            </div> */}
                        </div>
                    </div>

                    {/* Additional footer elements */}
                    <div className="mt-8 md:flex justify-between items-center">
                        {/* <div className="flex justify-center space-x-6">
                            {socialMediaLinks.map((social, index) => (
                                <a key={index} href={social.href} className="text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">{social.label}</span>
                                    {social.icon}
                                </a>
                            ))}
                        </div> */}
                        <p className="mt-8 text-center text-sm text-gray-500">
                          Warby Parker. All rights reserved.
                        </p>
                        <div className="flex justify-center space-x-6 mt-4">
                            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Terms & Conditions</a>
                            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</a>
                            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Accessibility</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
