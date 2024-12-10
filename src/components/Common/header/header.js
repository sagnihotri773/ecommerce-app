"use client";
import Image from 'next/image';
import { Search, ShoppingCart, ChevronDown, ChevronUp, Menu, X, ChevronRight, ChevronUpCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Options from './options';
import "./styles.css";
import { DRAWER_TYPE, UrlSuffix } from '@/components/Util/commonFunctions';
import { openDrawer } from '@/lib/redux/slices/drawerSlice';
import Input from './common/input';
import { SearchModel } from '../NavBar/SearchModel';
import Dummy from "@/assets/Images/DummyUser.png";

import dynamic from "next/dynamic";
import { AddWishListSvg } from '@/components/SvgFiles/SvgFile';
import CurrencyStore from './common/CurrencyStore';
const MobileMenu = dynamic(() => import('@/components/Common/header/MobileMenu'), { ssr: false });
const UserModel = dynamic(() => import('@/components/Common/NavBar/UserProfileDrawer'), { ssr: false });
const LogoComponent = dynamic(() => import('@/components/Common/header/common/LogoComponent'), { ssr: false });
const WishlistModel = dynamic(() => import('@/components/Wishlist/WishlistModel'), { ssr: false });
const CartPageModel = dynamic(() => import('@/components/Common/NavBar/CartPageModel'), { ssr: false });

export default function Header({ navBarOptions }) {
    const [headerData, setHeaderData] = useState({});
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [searchModel, setSearchModel] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const { isOpen: isDrawerOpen, type } = useSelector((state) => state.drawer);
    const toggleSidebar = () => setIsOpen(!isOpen);
    const storeConfigData = useSelector((state) => state?.store?.storeConfigData);
    const { token } = useSelector((state) => state.customer);
    const {
        cart_id: cartId,
        cart,
        loading,
    } = useSelector((state) => state.customer);
    const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (storeConfigData?.availableStores) {
            setHeaderData(storeConfigData?.availableStores[0]?.staticContent?.header);
        }
    }, [storeConfigData?.availableStores]);

    const handleOpenDrawer = (type, title) => {
        dispatch(openDrawer({ type: type, title: title }));
    };

    const getDrawerComponent = (type) => {
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
    };

    useEffect(() => {
        if (navBarOptions) {
            setIsLoading(false);
        }
    }, [navBarOptions]);

    useEffect(() => {
        if (isDrawerOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isDrawerOpen]);

    const handleSearchToggle = () => {
        setSearchModel(!searchModel);
    };

    const skeletonLoader = (
        <div className="animate-pulse space-x-4">
            <div className="w-16 h-5 bg-gray-300 rounded"></div>
            <div className="w-16 h-5 bg-gray-300 rounded"></div>
            <div className="w-16 h-5 bg-gray-300 rounded"></div>
            <div className="w-16 h-5 bg-gray-300 rounded"></div>
        </div>
    );

    return (
        <header className="absolute w-full transition-all duration-300 ease-in-out z-50">
            <div className="bg-black text-white py-2 transition-all duration-300 ease-in-out">
                <div className="container mx-auto flex justify-between items-center text-xs md:px-0 px-4">
                    <div className="flex space-x-4 cursor-pointer">
                        {isLoading ? skeletonLoader : (
                            <>
                                <Image src="https://pearl.weltpixel.com/media/weltpixel/multistore/logo/stores/2/logo-01_6.svg" alt="REMIX" width={60} height={20} />
                                <Image src="https://pearl.weltpixel.com/media/weltpixel/multistore/logo_inactive/stores/5/logo-02_1.svg" alt="FRED PERRY" width={80} height={20} />
                                <Image src="https://pearl.weltpixel.com/media/weltpixel/multistore/logo_inactive/stores/8/logo-03_2.svg" alt="core mania" width={80} height={20} />
                                <Image src="https://pearl.weltpixel.com/media/weltpixel/multistore/logo_inactive/stores/9/logo-04.svg" alt="BETTY BUIT" width={70} height={20} />
                            </>
                        )}
                    </div>
                    <div className="flex space-x-4 hidden md:block cursor-pointer">
                        <span>TRACKING INFO</span>
                        {!token && <span onClick={() => handleOpenDrawer(DRAWER_TYPE.USER)}>SIGN IN OR CREATE AN ACCOUNT</span>}
                    </div>
                </div>
            </div>

            <div className={`${isScrolled ? '!bg-white top-0 shadow-lg text-black' : 'bg-transparent text-white'} transition-colors duration-300 ease-in-out`} id={isScrolled ? "topnav" : ''}>
                <div className="container mx-auto py-4 flex justify-between items-center md:px-0 px-4">
                    <LogoComponent toggleSidebar={toggleSidebar} isLoading={isLoading} className={isScrolled ? 'md:w-20' : ''} />
                    {isScrolled ? (
                        <nav className="container mx-auto pt-2 flex space-x-6 text-sm transition-opacity duration-300 ease-in-out opacity-100 hidden md:block text-balck">
                            {isLoading ? skeletonLoader : <Options menuItems={navBarOptions} />}
                        </nav>
                    ) : ""}
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Input handleSearchToggle={handleSearchToggle} isScrolled={isScrolled} />
                        </div>
                        <div className="md:min-w-[40px] min-h-[24px] items-center space-x-1 transition-all duration-300">
                            <CurrencyStore isScrolled={true} />
                        </div>
                        <span
                                        onClick={() =>
                                            handleOpenDrawer(DRAWER_TYPE.CART, "Your Shopping Cart")
                                        }
                                        className="cursor-pointer relative"
                                    >
                                        <ShoppingCart size={30} className="cursor-pointer" />
                                        {cart?.total_quantity > 0 && (
                                            <span className="absolute top-2 right-2 transform translate-x-1/2 -translate-y-1/2 w-5 h-5 text-xs font-bold text-white bg-primary rounded-full flex items-center justify-center">
                                                {cart?.itemsV2?.total_count}
                                            </span>
                                        )}
                                    </span>
                        <div className="size-9 inline-flex items-center justify-center tracking-wide cursor-pointer align-middle duration-500 text-base text-center rounded-full bg-primary text-white" onClick={() => handleOpenDrawer(DRAWER_TYPE.WISHLIST, 'Wishlist')}>
                            <AddWishListSvg />
                        </div>
                        <div
                            type="button"
                            className="size-9 cursor-pointer inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full bg-primary text-white"
                            id="user-menu-button"
                            aria-expanded="false"
                            data-dropdown-toggle="user-dropdown"
                            data-dropdown-placement="bottom"
                            onClick={() => handleOpenDrawer(DRAWER_TYPE.USER)}
                        >
                            {isLoading ? (
                                <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse"></div>
                            ) : (
                                <Image
                                    className="w-8 h-8 rounded-full"
                                    src={Dummy}
                                    width={100}
                                    height={100}
                                    alt="user photo"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Nav */}
            <div className="hidden md:flex text-center m-auto md:block">
                <nav className="container mx-auto py-2 flex space-x-6 text-sm transition-all duration-300 ease-in-out text-white">
                    {isLoading ? skeletonLoader : (
                        <Options menuItems={navBarOptions} />
                    )}
                </nav>
            </div>

            {/* Mobile menu */}
            <div className={`fixed inset-0 z-40 ${isOpen ? 'block' : 'hidden'}`} onClick={toggleSidebar} >
                <div className={`fixed top-0 left-0 w-80 h-screen bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end items-center px-4 py-2 border-b">
                        <button onClick={toggleSidebar} className="p-2" aria-label="Close menu">
                            <X size={24} />
                        </button>
                    </div>
                    <div className='max-h-screen overflow-y-auto mt-4 pb-28'>
                        {isLoading ? skeletonLoader : (
                            navBarOptions.map((item, index) => (
                                <MobileMenu key={index} item={item} isOpen={isOpen} setIsOpen={setIsOpen} closeDrawer={toggleSidebar} />
                            ))
                        )}
                    </div>
                </div>
            </div>
            {getDrawerComponent(type)}
            {searchModel ? (
                <SearchModel setSearchModel={setSearchModel} searchModel={searchModel} />
            ) : ''}
        </header>
    );
}
