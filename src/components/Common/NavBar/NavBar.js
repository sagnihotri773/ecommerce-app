"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Dummy from "@/assets/Images/dummy.png";
import { Link } from "@/components/ui/Link";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { MobileView } from "./Mobile";
import { setCurrency } from "@/lib/redux/slices/currency";
import Cookies from "js-cookie";
import { AddWishListSvg, CartSvg } from "@/components/SvgFiles/SvgFile";
import { currentStoreCode, DRAWER_TYPE, renderHtmlDynamic } from "@/components/Util/commonFunctions";
import { selectStoreInfo } from "@/lib/redux/slices/storeConfig";
import { SearchModel } from "./SearchModel";
import { homeUrl } from "@/components/RouteManager";
import { openDrawer } from "@/lib/redux/slices/drawerSlice";
import SimpleSelect from "@/components/Util/Form/switchCurrency";
import { SelectStore } from "@/components/Util/Form/switchStore";

import dynamic from "next/dynamic";
const UserModel = dynamic(() => import('@/components/Common/NavBar/UserProfileDrawer'), { ssr: false });
const WishlistModel = dynamic(() => import('@/components/Wishlist/WishlistModel'), { ssr: false });
const CartPageModel = dynamic(() => import('@/components/Common/NavBar/CartPageModel'), { ssr: false });
const DesktopView = dynamic(() => import('@/components/Common/NavBar/DesktopView'), { ssr: false });

export default function NavBar({ navBarOptions }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModel, setSearchModel] = useState(false);
  const [cur, setCur] = useState("USD");
  const [selectedStore, setSelectedStore] = useState("default");
  const storeLogoUrl = useSelector((state) => selectStoreInfo(state, "logo"));
  const [headerData, setHeaderData] = useState({});
  const { isOpen, type } = useSelector((state) => state.drawer);
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();


  const storeConfigData = useSelector((state) => state?.store?.storeConfigData);

  useEffect(() => {
    if (storeConfigData?.availableStores) {
      setHeaderData(storeConfigData?.availableStores[0]?.staticContent?.header);
    }
  }, [storeConfigData?.availableStores])


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
    setCur(localStorage.getItem("currency") || "USD");
    setSelectedStore(currentStoreCode);
  }, []);


  useEffect(() => {
    if (!currentStoreCode && storeConfigData) {
      localStorage.setItem(
        "selectedStore",
        storeConfigData?.availableStores[0]?.store_code
      );
    }
  }, [storeConfigData]);

  const selectCurrency = (value) => {
    setCur(value);
    dispatch(setCurrency(value));
    if (typeof window !== "undefined") {
      localStorage.setItem("currency", value);
    }
  };

  const handleMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchToggle = () => {
    setSearchModel(!searchModel);
  };


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const CURRENCY = storeConfigData?.availableStores || [];

  const handleStoreChange = (event) => {
    const newValue = event.target.value;
    setSelectedStore(newValue);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedStore", newValue);
    }
    Cookies.set(
      "locale",
      storeConfigData?.availableStores?.find(
        (item) => item.store_code === newValue
      )?.locale,
      { expires: 1 }
    ); // Expires in 1 day
    window.location.reload();
  };

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

  return (
    <>
      {/* {renderHtmlDynamic(headerData?.topContent)} */}
      <nav
        id="topnav"
        className={`is-sticky tagline-height  ${!isScrolled ? 'bg-transparent ' : 'bg-transparent backdrop-blur-md top-0'} ${headerData?.topContent ? '' : 'top-0'}`}  >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {storeLogoUrl ?
            <Link
              href={homeUrl}
              prefetch={true}
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src={storeLogoUrl}
                className="h-4 w-25"
              />
            </Link> : ''}
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <ul className="buy-button list-none mb-0">
              <li className="dropdown inline-block relative pe-1">
                <button
                  data-dropdown-toggle="dropdown"
                  className="dropdown-toggle align-middle inline-flex search-dropdown text-xl"
                  type="button"
                  onClick={() => handleSearchToggle()}
                >
                             <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clip-path="url(#clip0_15_152)"> <rect width="30" height="30" ></rect> <circle cx="10.5" cy="10.5" r="6.5" stroke="#000000" stroke-linejoin="round"></circle> <path d="M19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L19.6464 20.3536ZM20.3536 19.6464L15.3536 14.6464L14.6464 15.3536L19.6464 20.3536L20.3536 19.6464Z" fill="#000000"></path> </g> <defs> <clipPath id="clip0_15_152"> <rect width="24" height="24" fill="white"></rect> </clipPath> </defs> </g></svg>

                </button>
              </li>
              {searchModel ? (
                <SearchModel
                  setSearchModel={setSearchModel}
                  searchModel={searchModel}
                />
              ) : (
                ""
              )}
              <li className="dropdown inline-block relative ps-0.5">
                <button
                  data-dropdown-toggle="dropdown"
                  className="dropdown-toggle size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full bg-primary border border-primary text-white"
                  type="button"
                  onClick={() => handleOpenDrawer(DRAWER_TYPE.CART, 'Your Shopping Cart')}
                >
                  <CartSvg />
                </button>
              </li>


              <li className="inline-block ps-0.5">
                <button className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full bg-primary text-white" onClick={() => handleOpenDrawer(DRAWER_TYPE.WISHLIST, 'Wishlist')}>
                  <AddWishListSvg />
                </button>
              </li>
              <li className="dropdown inline-block relative ps-0.5">
                <button
                  type="button"
                  className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full bg-primary text-white"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                  onClick={() => handleOpenDrawer(DRAWER_TYPE.USER)}
                >
                  <span className="sr-only">Open user menu</span>
                  <Image
                    className="w-8 h-8 rounded-full"
                    src={Dummy}
                    width={500}
                    height={500}
                    alt="user photo"
                  />
                </button>

              </li>
            </ul>

            {getDrawerComponent(type)}

            {CURRENCY?.length > 1 && (
              <div className="hidden md:block !ml-[24px]">
                <SimpleSelect
                  data={CURRENCY}
                  value={cur}
                  onSelect={selectCurrency}
                />
              </div>
            )}
            {storeConfigData?.length > 1 && (
              <div className="hidden md:block !ml-9 text-white">
                <SelectStore
                  selectedStore={selectedStore}
                  handleStoreChange={handleStoreChange}
                  storeConfigData={storeConfigData}
                />
              </div>
            )}
            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={handleMenuToggle}
              aria-expanded="false"
              aria-controls="navbar-user"
              data-collapse-toggle="navbar-user"
            >
              {isMobileMenuOpen ? (
                <svg width="30px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Close_Circle"> <path id="Vector" d="M9 9L11.9999 11.9999M11.9999 11.9999L14.9999 14.9999M11.9999 11.9999L9 14.9999M11.9999 11.9999L14.9999 9M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>              ) : (
                <div className="text-3xl"
                onClick={() => setMobileMenuOpen(false)}>
                  <svg width="24px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M4 12H20M4 18H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </div>
              )}
            </button>
          </div>
          <DesktopView
            navBarOptions={navBarOptions}
          />
        </div>

        <MobileView
          navBarOptions={navBarOptions}
          handleMenuToggle={handleMenuToggle}
          isMobileMenuOpen={isMobileMenuOpen}
        />
        {/* {renderHtmlDynamic(headerData?.bottomContent)} */}
      </nav>
    </>
  );
}
