"use client"
import { closeDrawer } from "@/lib/redux/slices/drawerSlice";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from 'framer-motion';
import { X } from "lucide-react";
import { useEffect } from "react";
import { addKeyListener, DRAWER_TYPE } from "@/components/Util/commonFunctions";

export default function Drawer({ children }) {
  const dispatch = useDispatch();
  const { isOpen, title, type } = useSelector((state) => state.drawer);
  const { cart } = useSelector((state) => state.customer);
  const wishListData = useSelector((state) => state?.wishlist);
  const handleCloseDrawer = () => {
    dispatch(closeDrawer());
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

  useEffect(() => {
    const cleanup = addKeyListener(() => dispatch(closeDrawer()));
    // Clean up the event listener when the component unmounts
    return cleanup;
}, [isOpen, dispatch]);

  return (
    <>
      <AnimatePresence>
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-30"
            onClick={handleCloseDrawer}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 500, damping: 50 }}
            className="fixed top-0 right-0 h-full w-full md:w-80 bg-white shadow-lg z-50"
          >
            {isOpen ?
              <div
                className="relative z-10"
                aria-labelledby="slide-over-title"
                role="dialog"
                aria-modal="true"
              >
                <div className="fixed inset-0 transition-opacity" aria-hidden="true"></div>

                <div className="fixed inset-0">
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                      <div className="pointer-events-auto w-full max-w-md">
                        <div className="flex h-screen flex-col w-full z-10 p-2">
                          <div className="relative flex-1">
                            <div
                              className="fixed inset-0 h-screen bg-black/30 w-full"
                              aria-hidden="true"
                              onClick={handleCloseDrawer}
                            ></div>

                            <div
                              className={`fixed top-0 right-0 bg-white p-4 max-h-screen h-screen md:max-w-[450px] md:min-w-[450px] w-full flex shadow-lg transition-transform duration-300 ease-in-out`}>
                              <header className="absolute top-0 z-10 flex w-full max-w-md items-center justify-between border-b border-border-200 border-opacity-75 bg-light px-6 py-4">
                                <div className="flex font-semibold text-accent">
                                  {DRAWER_TYPE.USER !== type && <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11 2C9.34315 2 8 3.34315 8 5V6.00038C7.39483 6.00219 6.86113 6.01237 6.41261 6.06902C5.8235 6.14344 5.25718 6.31027 4.76902 6.73364C4.28087 7.15702 4.03562 7.69406 3.87865 8.26672C3.73286 8.79855 3.63761 9.46561 3.52795 10.2335L3.51947 10.2929L2.65222 16.3636C2.50907 17.3653 2.38687 18.2204 2.38563 18.9086C2.38431 19.6412 2.51592 20.3617 3.03969 20.9656C3.56347 21.5695 4.25813 21.8017 4.98354 21.904C5.66496 22.0001 6.52877 22.0001 7.54064 22H16.4594C17.4713 22.0001 18.3351 22.0001 19.0165 21.904C19.7419 21.8017 20.4366 21.5695 20.9604 20.9656C21.4842 20.3617 21.6158 19.6412 21.6144 18.9086C21.6132 18.2204 21.491 17.3653 21.3478 16.3635L20.4721 10.2335C20.3625 9.46561 20.2672 8.79855 20.1214 8.26672C19.9645 7.69406 19.7192 7.15702 19.2311 6.73364C18.7429 6.31027 18.1766 6.14344 17.5875 6.06902C17.1389 6.01237 16.6052 6.00219 16 6.00038V5C16 3.34315 14.6569 2 13 2H11ZM14 6V5C14 4.44772 13.5523 4 13 4H11C10.4477 4 10 4.44772 10 5V6L14 6ZM9 8C9.55228 8 10 8.44772 10 9V11C10 11.5523 9.55228 12 9 12C8.44772 12 8 11.5523 8 11V9C8 8.44772 8.44772 8 9 8ZM16 9C16 8.44772 15.5523 8 15 8C14.4477 8 14 8.44772 14 9V11C14 11.5523 14.4477 12 15 12C15.5523 12 16 11.5523 16 11V9Z" fill="#323232"></path> </g></svg>}
                                  <span className="flex ltr:ml-2 rtl:mr-2">
                                    {
                                      type === DRAWER_TYPE.CART
                                        ? `${cart?.itemsV2?.items?.length || 0} Items`
                                        : type === DRAWER_TYPE.WISHLIST
                                          ? `${wishListData?.wishlist?.wishlist?.items?.length || 0} Items`
                                          : ''
                                    }
                                  </span>
                                </div>
                                <button className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-muted transition-all duration-200 hover:bg-accent hover:text-light focus:bg-accent focus:text-light focus:outline-0 " onClick={handleCloseDrawer}>
                                  <span className="sr-only">close</span>
                                  <X />
                                </button>
                              </header>
                              {/* <button
                                type="button"
                                aria-hidden="true"
                                className="absolute flex w-full justify-between items-center space-x-2 text-gray-500 hover:text-gray-700 px-4 bold"
                              >
                                <p>{title}</p>
                                <div onClick={handleCloseDrawer}>
                                  <CloseDrawerModel />
                                </div>
                              </button> */}
                              <div className="mt-10 flex-grow py-2">{children}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              : ''}
          </motion.div>
        </>
      </AnimatePresence>
    </>
  );
};