"use client";
import { X, ShoppingCartIcon, SearchCheck, ChevronDown } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Options from './options';
import { DRAWER_TYPE } from '@/components/Util/commonFunctions';
import { openDrawer } from '@/lib/redux/slices/drawerSlice';
import Input from './common/input';
import "./styles.css";
import MobileDrawer from './common/MobileDrawer';
import { SearchModel } from '../NavBar/SearchModel';
import dynamic from "next/dynamic";
import classNames from 'classnames';
import { AddWishListSvg } from '@/components/SvgFiles/SvgFile';
import Image from 'next/image';
import CurrencyStore from './common/CurrencyStore';
import Dummy from "@/assets/Images/DummyUser.png";

const UserModel = dynamic(() => import('@/components/Common/NavBar/UserProfileDrawer'), { ssr: false });
const LogoComponent = dynamic(() => import('@/components/Common/header/common/LogoComponent'), { ssr: false });
const WishlistModel = dynamic(() => import('@/components/Wishlist/WishlistModel'), { ssr: false });
const CartPageModel = dynamic(() => import('@/components/Common/NavBar/CartPageModel'), { ssr: false });

export default function Header({ navBarOptions }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [searchModel, setSearchModel] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useSelector((state) => state.customer);

    const dispatch = useDispatch();
    const { isOpen: isDrawerOpen, type } = useSelector((state) => state.drawer);

    const handleScroll = useCallback(() => {
        setIsScrolled(window.scrollY > 0);
    }, []);
    const {
        cart_id: cartId,
        cart,
        loading,
    } = useSelector((state) => state.customer);
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

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        document.body.style.overflow = isDrawerOpen ? "hidden" : "auto";
        return () => { document.body.style.overflow = "auto"; };
    }, [isDrawerOpen]);

    useEffect(() => {
        if (navBarOptions) {
            setIsLoading(false);
        }
    }, [navBarOptions]);

    const actionButton = (
        <div className="md:flex hidden space-x-2 px-4 py-2">
            <CurrencyStore isScrolled={true} />
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
            <Input handleSearchToggle={handleSearchToggle} isScrolled={isScrolled} />
        </div>
    )

    return (
        <header className="absolute w-full transition-all duration-300 ease-in-out z-50">
            <div className="container m-auto px-4 text-black">
                <div className={classNames("flex justify-between text-sm transition-opacity duration-300", {
                    "text-white": !isScrolled
                })}>
                    <div className="md:flex hidden align-center space-x-4 px-4 py-2 text-xs">
                        <div className="relative group">
                            <button className="flex items-center hover:underline">
                                {isLoading ? (
                                    <div className="w-32 h-4 bg-gray-300 animate-pulse"></div>
                                ) : (
                                    <>PEARL FASHION V3 <ChevronDown size={14} className="ml-1" /></>
                                )}
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg hidden group-hover:block text-black">
                                {isLoading ? (
                                    <div className="h-12 w-full bg-gray-300 animate-pulse"></div>
                                ) : (
                                    <>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Option 1</a>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Option 2</a>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Option 3</a>
                                    </>
                                )}
                            </div>
                        </div>
                        {isLoading ? (
                            <div className="w-32 h-4 bg-gray-300 animate-pulse"></div>
                        ) : (
                            <a href="#" className="hover:underline">TRACKING INFO</a>
                        )}
                        {isLoading ? (
                            <div className="w-32 h-4 bg-gray-300 animate-pulse"></div>
                        ) : (
                            !token && <span onClick={() => handleOpenDrawer(DRAWER_TYPE.USER)}>SIGN IN OR CREATE AN ACCOUNT</span>
                        )}
                    </div>
                    {actionButton}
                </div>
            </div>

            <div className={classNames({
                "!bg-white top-0 shadow-lg": isScrolled,
                "bg-transparent text-white": !isScrolled
            }, "transition-colors duration-300 ease-in-out")} id={isScrolled ? "topnav" : ''}>
                <LogoComponent toggleSidebar={toggleSidebar} isLoading={isLoading} className='hidden md:flex mt-2 justify-end' logCss={isScrolled ? "right-[20%]" : "right-[47%]"}> {isScrolled ? actionButton : ''} </LogoComponent>

                <div className="container mx-auto py-4 flex justify-between items-center lg:px-8 px-4">
                    <LogoComponent toggleSidebar={toggleSidebar} className='md:hidden block' >
                    </LogoComponent>
                    <nav className="justify-center md:flex hidden container mx-auto pt-2 space-x-6 text-sm transition-opacity duration-300 opacity-100">
                        <Options menuItems={navBarOptions} isLoading={isLoading} />
                    </nav>
                    <div className="flex items-center space-x-4 mt-2 md:hidden block">
                        <div className="md:flex justify-between items-center px-4 py-2">
                            <div className="flex items-center space-x-4">
                                <CurrencyStore isScrolled={true} />
                                <SearchCheck size={20} className="cursor-pointer" onClick={handleSearchToggle} aria-label="Search" />
                                {isLoading ? (
                                    <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                                ) : (
                                    <span onClick={() => handleOpenDrawer(DRAWER_TYPE.CART, 'Your Shopping Cart')}>
                                        <ShoppingCartIcon size={20} />
                                    </span>
                                )}
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

            <MobileDrawer navBarOptions={navBarOptions} isOpen={isOpen} setIsOpen={setIsOpen} />
            {getDrawerComponent(type)}
            {searchModel && (
                <SearchModel
                    setSearchModel={setSearchModel}
                    searchModel={searchModel}
                />
            )}
        </header>
    );
}
