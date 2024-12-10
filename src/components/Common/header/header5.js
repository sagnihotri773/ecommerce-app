"use client";
import { ShoppingCart, Search, User } from "lucide-react";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DRAWER_TYPE } from "@/components/Util/commonFunctions";
import { openDrawer } from "@/lib/redux/slices/drawerSlice";
import classNames from "classnames";
import { WishlistSvg } from "@/components/SvgFiles/SvgFile";
import { SearchModel } from '../NavBar/SearchModel';
import dynamic from "next/dynamic";
import debounce from "lodash/debounce";
import "./styles.css";
import SearchInterface from "../SearchPop/SearchPopUp";

const MobileDrawer = dynamic(() => import("@/components/Common/header/common/MobileDrawer"), { ssr: true });
// const LanguageSwitcher = dynamic(() => import("@/components/Common/header/common/LanguageSwitcher"), { ssr: true });
const CurrencyStore = dynamic(() => import("@/components/Common/header/common/CurrencyStore"), { ssr: true });
const UserModel = dynamic(() => import("@/components/Common/NavBar/UserProfileDrawer"), { ssr: false });
const LogoComponent = dynamic(() => import("@/components/Common/header/common/LogoComponent"), { ssr: false });
const WishlistModel = dynamic(() => import("@/components/Wishlist/WishlistModel"), { ssr: false });
const CartPageModel = dynamic(() => import("@/components/Common/NavBar/CartPageModel"), { ssr: false });
const Options = dynamic(() => import("./options"), { ssr: true });

export default function Header5({ navBarOptions, isLoading = true }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [searchModel, setSearchModel] = useState(false);

    const dispatch = useDispatch();
    const { isOpen: isDrawerOpen, type } = useSelector((state) => state.drawer);

    const handleScroll = useCallback(() => {
        setIsScrolled(window.scrollY > 0);
    }, []);
    const { cart } = useSelector((state) => state.customer);

    const toggleSidebar = useCallback(() => setIsOpen((prev) => !prev), []);
    const handleSearchToggle = useCallback(() => setSearchModel((prev) => !prev), []);
    const handleOpenDrawer = useCallback((type, title) => {
        dispatch(openDrawer({ type, title }));
    }, [dispatch]);

    const getDrawerComponent = useCallback((type) => {
        switch (type) {
            case DRAWER_TYPE.CART:
                return <CartPageModel />;
            case DRAWER_TYPE.WISHLIST:
                return <WishlistModel />;
            case DRAWER_TYPE.USER:
                return <UserModel />;
            default:
                return null;
        }
    }, []);

    const debouncedHandleScroll = useCallback(
        debounce(() => {
            handleScroll();
        }, 1),
        [handleScroll]
    );

    useEffect(() => {
        // Attach debounced scroll handler
        window.addEventListener("scroll", debouncedHandleScroll);

        return () => {
            window.removeEventListener("scroll", debouncedHandleScroll);
        };
    }, [debouncedHandleScroll]);

    useEffect(() => {
        document.body.style.overflow = isDrawerOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isDrawerOpen]);

    return (
        <header className="w-full transition-all duration-300 ease-in-out z-50 bg-white shadow">
            {!isScrolled && (
                <div className={`container-fluid text-black bg-gray-200 hidden md:block ${isScrolled ? "md:hidden" : "py-4"}`}>
                    <div className="container m-auto flex justify-between items-center text-sm px-4 md:px-0">
                        <div className="text-gray-700">
                            Free shipping for all orders of <span className="font-semibold">$150</span>
                        </div>
                        <div className="text-gray-700">
                            <CurrencyStore isScrolled={true} className={true} />
                        </div>
                        {/* <div className="text-gray-700">
                            <LanguageSwitcher className={true} />
                        </div> */}

                    </div>
                </div>
            )}

            <div className="container-fluid !bg-white" id={isScrolled ? "topnav" : ""}>
                <div
                    className={classNames(
                        { "top-0 sticky": isScrolled },
                        "transition-colors duration-300 text-black ease-in-out container mx-auto flex justify-between items-center py-4 px-4 md:px-4 lg:px-0"
                    )}
                >
                    <div className="flex items-center">
                        <Suspense fallback={<div className="w-20 h-10 bg-gray-300 animate-pulse"></div>}>
                            <LogoComponent toggleSidebar={toggleSidebar} className="md:w-20" logCss="py-2 md:py-0" />
                        </Suspense>
                    </div>
                    {isLoading ? (
                        <div className="hidden md:flex justify-center space-x-6 ml-10 mb-4">
                            {[...Array(5)].map((_, index) => (
                                <div
                                    key={index}
                                    className="w-24 h-4 bg-gray-300 animate-pulse rounded"
                                ></div>
                            ))}
                        </div>
                    ) : (
                        <Suspense fallback={<div className="w-24 h-4 bg-gray-300 animate-pulse rounded"></div>}>
                            <div className="hidden md:flex mb-4">
                                <Options menuItems={navBarOptions} isLoading={isLoading} linkClass="text-gray-700 hover:text-secondary uppercase font-semibold" />
                            </div>
                        </Suspense>
                    )}
                    <div className="flex items-center space-x-4 cursor-pointer">
                        <Search className="w-5 h-5 text-gray-700" onClick={handleSearchToggle} />
                        <div className="w-5 h-5 text-gray-700 cursor-pointer" onClick={() => handleOpenDrawer(DRAWER_TYPE.WISHLIST, "Wishlist")}>
                            <WishlistSvg />
                        </div>
                        <div className="relative cursor-pointer" onClick={() => handleOpenDrawer(DRAWER_TYPE.CART, "Your Shopping Cart")}>
                            <ShoppingCart
                                className="w-5 h-5 text-gray-700 cursor-pointer"
                            />
                            {cart?.total_quantity > 0 ? (
                                <span className="absolute top-0 right-0 w-5 h-5 text-xs font-bold text-white bg-black rounded-full flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                                    {cart?.itemsV2?.total_count}
                                </span>
                            ) : ''}
                        </div>
                        <User className="w-5 h-5 text-gray-700 cursor-pointer" onClick={() => handleOpenDrawer(DRAWER_TYPE.USER)} />
                    </div>
                </div>
            </div>

            <Suspense fallback={<div>Loading drawer...</div>}>
                <MobileDrawer navBarOptions={navBarOptions} isOpen={isOpen} setIsOpen={setIsOpen} />
                {getDrawerComponent(type)}
            </Suspense>

            {searchModel ? <SearchInterface setSearchModel={setSearchModel} searchModel={searchModel} /> : ''}
        </header>
    );
}
