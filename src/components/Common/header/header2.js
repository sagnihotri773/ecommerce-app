"use client";
import { Search, ChevronDown, ChevronUp, X, ShoppingCartIcon, SearchCheck } from 'lucide-react';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Options from './options';
import "./styles.css";
import { DRAWER_TYPE } from '@/components/Util/commonFunctions';
import { openDrawer } from '@/lib/redux/slices/drawerSlice';
import Input from './common/input';
import { SearchModel } from '../NavBar/SearchModel';
import Dummy from "@/assets/Images/DummyUser.png";
import { AddWishListSvg } from '@/components/SvgFiles/SvgFile';
import Image from 'next/image';
import dynamic from "next/dynamic";

const CurrencyStore = dynamic(() => import('@/components/Common/header/common/CurrencyStore'), {
    ssr: false,
    loading: () => <div className="skeleton-loader w-10 h-6" />
});
const MobileMenu = dynamic(() => import('@/components/Common/header/MobileMenu'), { ssr: false });
const Customer = dynamic(() => import('@/components/Common/header/common/customer'), { ssr: false });
const LogoComponent = dynamic(() => import('@/components/Common/header/common/LogoComponent'), {
    ssr: false,
    loading: () => <div className="skeleton-loader w-24 h-8" />
});
const WishlistModel = dynamic(() => import('@/components/Wishlist/WishlistModel'), { ssr: false });
const CartPageModel = dynamic(() => import('@/components/Common/NavBar/CartPageModel'), { ssr: false });
const UserModel = dynamic(() => import('@/components/Common/NavBar/UserProfileDrawer'), { ssr: false });

export default function Header({ navBarOptions }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('menu');
    const { isOpen: isDrawerOpen, type } = useSelector((state) => state.drawer);
    const [searchModel, setSearchModel] = useState(false);
    const dispatch = useDispatch();

    const handleScroll = useCallback(() => {
        setIsScrolled(window.scrollY > 0);
    }, []);

    const toggleSidebar = useCallback(() => setIsOpen((prev) => !prev), []);
    const toggleTab = useCallback((tab) => setActiveTab(tab), []);
    const handleSearchToggle = useCallback(() => setSearchModel((prev) => !prev), []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const drawerComponents = useMemo(() => ({
        [DRAWER_TYPE.CART]: <CartPageModel />,
        [DRAWER_TYPE.WISHLIST]: <WishlistModel />,
        [DRAWER_TYPE.USER]: <UserModel />,
    }), []);

    const getDrawerComponent = drawerComponents[type] || null;

    useEffect(() => {
        document.body.style.overflow = isDrawerOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isDrawerOpen]);

    const handleOpenDrawer = (type, title) => {
        dispatch(openDrawer({ type, title }));
    };

    const {
      cart_id: cartId,
      cart,
      loading,
  } = useSelector((state) => state.customer);

    return (
        <header className={`absolute w-full transition-all duration-300 ease-in-out z-50`}>
            <div className="bg-black text-white py-2 transition-all duration-300 ease-in-out block md:hidden">
                <div className="container mx-auto px-4 lg:px-8 flex justify-center items-center text-xs">
                    {/* Skeleton Loader for Flag */}
                    {!isScrolled ? <CurrencyStore isScrolled={isScrolled} /> : <div className="skeleton-loader w-10 h-6"></div>}
                </div>
            </div>
            <div className={`${isScrolled ? '!bg-white top-0 shadow-lg text-black' : 'bg-transparent text-white'} transition-all duration-300 ease-in-out`} id={isScrolled ? "topnav" : ''}>
                <div className={`container mx-auto py-4 flex justify-between items-center ${isScrolled ? 'md:pl-0 pl-4' : 'md:px-0  px-4'}`}>

                    <LogoComponent toggleSidebar={toggleSidebar} className={isScrolled ? 'md:w-20' : ''} />

                    {isScrolled && (
                        <nav className="justify-between md:flex hidden container mx-auto pt-2 space-x-6 text-sm transition-opacity duration-300 ease-in-out opacity-100">
                            <Options menuItems={navBarOptions} />
                            <Input handleSearchToggle={handleSearchToggle} isScrolled={isScrolled} />
                        </nav>
                    )}

                    <div className="flex items-center space-x-4 mt-2 h-10">
                        <div className="justify-between items-center px-4 py-2">
                            <div className="flex items-center space-x-3">
                                <div className="md:min-w-[40px] min-h-[24px] items-center space-x-1 transition-all duration-300">
                                    <CurrencyStore isScrolled={true} />
                                </div>

                                <SearchCheck className="cursor-pointer" size={20} onClick={handleSearchToggle} aria-label="Search" />

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

                                <div className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full bg-primary text-white" onClick={() => handleOpenDrawer(DRAWER_TYPE.WISHLIST, 'Wishlist')}>
                                    <AddWishListSvg className="w-6 h-6 flex items-center justify-center" />
                                </div>

                                <button
                                    type="button"
                                    className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full bg-primary text-white"
                                    onClick={() => handleOpenDrawer(DRAWER_TYPE.USER)}
                                >
                                    <Image
                                        className="w-8 h-8 rounded-full"
                                        src={Dummy}
                                        width={32}
                                        height={32}
                                        alt="user photo"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Nav */}
            <div className={`hidden md:block md:flex text-center m-auto ${!isScrolled ? 'text-white' : 'text-black'}`}>
                <div className="container mx-auto px-4 md:px-0 flex justify-between">
                    <nav className="md:px-0 py-2 flex space-x-6 text-sm transition-all duration-300 ease-in-out">
                        <Options menuItems={navBarOptions} />
                    </nav>
                    <Input handleSearchToggle={handleSearchToggle} isScrolled={isScrolled} />
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`fixed inset-0 z-40 ${isOpen ? 'block' : 'hidden'}`} onClick={toggleSidebar} >
                <div className={`fixed top-0 left-0 w-80 h-screen bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} onClick={(e) => e.stopPropagation()} >
                    <div className="bg-[#f7f7f7] flex items-center bg-white border-b">
                        {['menu', 'account'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => toggleTab(tab)}
                                className={`flex items-center space-x-2 focus:outline-none p-4 ${activeTab === tab ? 'bg-white' : 'bg-[#f7f7f7]'}`}
                            >
                                <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                            </button>
                        ))}
                        <button
                            onClick={toggleSidebar}
                            className="p-2 flex w-[100%] justify-end"
                            aria-label="Close menu"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <div className='max-h-screen overflow-y-auto mt-4 pb-28'>  
                    {activeTab === 'menu' ? (
                        navBarOptions.map((item, index) => (
                            <MobileMenu
                                key={index}
                                item={item}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                closeDrawer={toggleSidebar}
                            />
                        ))
                    ) : (
                        <Customer />
                    )}
                    </div>

                </div>
            </div>
            {getDrawerComponent}

            {searchModel && (
                <SearchModel
                    setSearchModel={setSearchModel}
                    searchModel={searchModel}
                />
            )}
        </header>
    );
}
