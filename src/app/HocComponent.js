'use client'
import React, { Suspense, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/graphql/apolloClient";
import { ToastContainer } from "react-toastify";
import { persistor, store } from "@/lib/redux/store";
import { Provider } from "react-redux";
import GetData from "@/components/GetData/GetData";
import { fetchStoreConfig, fetchCurrency } from "@/lib/redux/slices/storeConfig";
import {
  forgotPasswordUrl,
  loginUrl,
  registerUrl,
  passwordResetSuccessUrl,
} from "@/components/RouteManager/index";
import { PersistGate } from "redux-persist/integration/react";
import dynamic from "next/dynamic";

// const Footer = dynamic(() => import('@/components/Common/Footer/Index').then((mod) => mod.default), { ssr: true });
const NavBar = dynamic(() => import('@/components/Common/header/Main'));
const CarButton = dynamic(() => import('@/components/Common/Cart/CarButton'));
const LoadingBar = dynamic(() => import('@/components/Common/LoadingComponent/LoadingBar'));
const FooterSeven = dynamic(() => import('@/components/Common/Footer/FooterSeven'));
const AllowCookies = dynamic(() => import('@/components/Common/AllowCookies/AllowCookies'));
import { closePopover, openPopover } from "@/lib/redux/slices/newsLetterSlice";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import 'swiper/css';

export default function HocComponent({ children, navBarOptions, cookie }) {
  const pathname = usePathname();
  const noLayoutPaths = [
    loginUrl,
    registerUrl,
    forgotPasswordUrl,
    `/thanks`,
    `/customer/account/createPassword`,
    passwordResetSuccessUrl,
  ];


  const checkRoute = noLayoutPaths.includes(pathname)
  useEffect(() => {
    const fetchConfig = async () => {
      const getSelectedStore = await store.dispatch(fetchStoreConfig());
      await store.dispatch(fetchCurrency());
      if (typeof window !== "undefined") {
        localStorage.setItem("currentStoreCode", getSelectedStore?.payload?.availableStores?.[0]?.store_code);
      }
    };
    fetchConfig();
  }, []);
  useEffect(() => {
    const getNewsletter = cookie?.isSubscribedNewsletter;
    const doNowShowNewsLetterBanner = cookie?.dontShowPopup;
    if (getNewsletter === "true" || doNowShowNewsLetterBanner === "true") {
      store.dispatch(closePopover());
    } else {
      setTimeout(() => {
        store.dispatch(openPopover());
      }, 1000);
    }
  }, [store.dispatch]);

  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GetData />
        <AllowCookies />
        <ApolloProvider client={client}>
          <LoadingBar />
          {!checkRoute && <NavBar navBarOptions={navBarOptions} />}
          {children}
          {!checkRoute && <Suspense fallback={'...loading'}> <CarButton /></Suspense>}
          {!checkRoute && <Suspense fallback={'...loading'}> <FooterSeven /> </Suspense>}
          <ToastContainer />
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}
