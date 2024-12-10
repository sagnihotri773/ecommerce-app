"use client";
import { X, ShoppingCartIcon, SearchCheck, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Options from './options';
import { DRAWER_TYPE } from '@/components/Util/commonFunctions';
import { openDrawer } from '@/lib/redux/slices/drawerSlice';
import Input from './common/input';
import "./styles.css";
import { SearchModel } from '../NavBar/SearchModel';
import { AddWishListSvg } from '@/components/SvgFiles/SvgFile';
import Dummy from "@/assets/Images/DummyUser.png";
import Image from 'next/image';
import dynamic from "next/dynamic";
import CurrencyStore from './common/CurrencyStore';
const MobileDrawer = dynamic(() => import('@/components/Common/header/common/MobileDrawer'), { ssr: false });
const UserModel = dynamic(() => import('@/components/Common/NavBar/UserProfileDrawer'), { ssr: false });
const LogoComponent = dynamic(() => import('@/components/Common/header/common/LogoComponent'), { ssr: false });
const WishlistModel = dynamic(() => import('@/components/Wishlist/WishlistModel'), { ssr: false });
const CartPageModel = dynamic(() => import('@/components/Common/NavBar/CartPageModel'), { ssr: false });

const bannerMessages = [
    "30-DAY FREE RETURNS Wear it, test it, keep what you like.",
    "FREE SHIPPING ON ORDERS OVER $50",
    "NEW ARRIVALS - Check out our latest collection!"
]

export default function Header({ navBarOptions }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [activeTab, setActiveTab] = useState('menu')
    const dispatch = useDispatch();
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
    const [fade, setFade] = useState(true)
    const [searchModel, setSearchModel] = useState(false);
    const { isOpen: isDrawerOpen, type } = useSelector((state) => state.drawer);
    const { token } = useSelector((state) => state.customer);

    const nextBanner = useCallback(() => {
        setFade(false)
        setTimeout(() => {
            setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % bannerMessages.length)
            setFade(true)
        }, 300)
    }, [])

    const prevBanner = useCallback(() => {
        setFade(false)
        setTimeout(() => {
            setCurrentBannerIndex((prevIndex) => (prevIndex - 1 + bannerMessages.length) % bannerMessages.length)
            setFade(true)
        }, 300)
    }, [])

    useEffect(() => {
        const intervalId = setInterval(nextBanner, 3000)
        return () => clearInterval(intervalId)
    }, [nextBanner])


    const toggleSidebar = () => setIsOpen(!isOpen)

    const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const sideBarOptions = [
        { title: 'Menu', value: 'menu' },
        { title: 'Account', value: 'account' }
    ]


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
                return <UserModel />
            default:
                return null;
        }
    };

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
    const {
        cart_id: cartId,
        cart,
        loading,
    } = useSelector((state) => state.customer);
    return (
        <header className="w-full transition-all duration-300 ease-in-out absolute z-50">
            <div className="bg-[#ffe8e8] text-[#b05d5d] py-2 px-4 flex items-center justify-center">
                <div className={`flex justify-center text-sm transition-opacity duration-300 `}>
                    <button onClick={prevBanner} className="text-[#b05d5d]" aria-label="Previous banner">
                        <ChevronLeft size={20} />
                    </button>
                    <div className={fade ? 'opacity-100' : 'opacity-0'}>

                        {bannerMessages[currentBannerIndex]}
                        <a href="#" className="ml-2 underline">See Details</a>
                    </div>
                    <button onClick={nextBanner} className="text-[#b05d5d]" aria-label="Next banner">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Top Right Options */}
            <div className="md:flex hidden justify-end space-x-4 px-4 py-2 text-xs text-white">
                <a href="#" className="hover:underline">TRACKING INFO</a>
                {!token && <span onClick={() => handleOpenDrawer(DRAWER_TYPE.USER)}>SIGN IN OR CREATE AN ACCOUNT</span>}
                <div className="relative group">
                    <button className="flex items-center hover:underline">
                        PEARL FASHION V3
                        <ChevronDown size={14} className="ml-1" />
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-200 rounded shadow-lg hidden group-hover:block">
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Option 1</a>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Option 2</a>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Option 3</a>
                    </div>
                </div>
            </div>

            <div className={`${isScrolled ? '!bg-white top-0 shadow-lg text-black' : 'bg-transparent text-white'} transition-colors duration-300 ease-in-out`} id={isScrolled ? "topnav" : ''}>
                <div className={`container mx-auto  py-4 flex justify-between items-center ${isScrolled ? 'lg:pl-8 pl-4' : 'lg:px-8 px-4'}`}>

                    <LogoComponent toggleSidebar={toggleSidebar} className={'md:w-20'} />

                    <nav className={`justify-between md:flex hidden container mx-auto  pt-2 space-x-6 text-sm transition-opacity duration-300 ease-in-out opacity-100 ${isScrolled ? 'lg:pl-8 pl-4' : 'lg:px-8 pl-4'}`}>
                        <Options menuItems={navBarOptions} />
                        <Input handleSearchToggle={handleSearchToggle} isScrolled={isScrolled} />
                    </nav>

                    <div className="flex items-center space-x-4 mt-2">
                        <div className="md:flex justify-between items-center px-4 py-2">
                            <div className="flex items-center space-x-4">

                                <div className="relative inline-flex items-center justify-center">
                                    <div className="min-w-[40px] min-h-[24px] items-center space-x-1 transition-all duration-300">
                                        <CurrencyStore isScrolled={true} />
                                    </div>
                                    <span
                                        onClick={() =>
                                            handleOpenDrawer(DRAWER_TYPE.CART, "Your Shopping Cart")
                                        }
                                        className="cursor-pointer relative"
                                    >
                                        <ShoppingCartIcon size={30} className="cursor-pointer" />
                                        {cart?.total_quantity > 0 && (
                                            <span className="absolute top-2 right-2 transform translate-x-1/2 -translate-y-1/2 w-5 h-5 text-xs font-bold text-white bg-primary rounded-full flex items-center justify-center">
                                                {cart?.itemsV2?.total_count}
                                            </span>
                                        )}
                                    </span>
                                </div>
                                <button className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full bg-primary text-white" onClick={() => handleOpenDrawer(DRAWER_TYPE.WISHLIST, 'Wishlist')}>
                                    <AddWishListSvg />
                                </button>

                                <button
                                    type="button"
                                    className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full bg-primary text-white"
                                    id="user-menu-button"
                                    aria-expanded="false"
                                    data-dropdown-toggle="user-dropdown"
                                    data-dropdown-placement="bottom"
                                    onClick={() => handleOpenDrawer(DRAWER_TYPE.USER)}
                                >
                                    <Image
                                        className="w-8 h-8 rounded-full"
                                        src={Dummy}
                                        width={100}
                                        height={100}
                                        alt="user photo"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Nav */}

            {/* Mobile menu */}
            <MobileDrawer navBarOptions={navBarOptions} isOpen={isOpen} setIsOpen={setIsOpen} />
            {getDrawerComponent(type)}
            {searchModel ?
                <SearchModel
                    setSearchModel={setSearchModel}
                    searchModel={searchModel}
                /> : ''}
        </header>
    );
}
