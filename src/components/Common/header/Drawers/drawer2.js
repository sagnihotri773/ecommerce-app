"use client"
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { EmptyCart } from '@/components/Cart/EmptyCart';
import { useDispatch, useSelector } from 'react-redux';
import { CART_TYPE, getPrice, getPriceAmount, getStockStatus, truncateTitle } from '@/components/Util/commonFunctions';
import { useDebouncedCallback } from 'use-debounce';
import { removeItemFromCart, updateCartItemsQuantity } from '@/lib/redux/slices/cartSlice';
import { Minus, Plus } from 'lucide-react';
import { closeDrawer } from '@/lib/redux/slices/drawerSlice';
import { Link } from "@/components/ui/Link";
import { checkOutUrl, shopCartUrl, shopUrl } from '@/components/RouteManager';
import dynamic from "next/dynamic";
const Price = dynamic(() => import('@/components/Currency/Price'), { ssr: false });

export default function drawer2() {
    const t = useTranslations("ShoppingCart");
    const dispatch = useDispatch();
    const { cart_id: cartId, cart } = useSelector((state) => state.customer);
    const [quantities, setQuantities] = useState({});


    const removeCartItem = (cart_item_id) => {
        dispatch(removeItemFromCart({ cart_id: cartId, cart_item_id }));
    };

    const UpdateCartItem = useCallback(
        (id, count) => {
          dispatch(updateCartItemsQuantity({ id, count, cartId }));
        },
        [cartId, dispatch]
      );

    const debouncedUpdateCartItem = useDebouncedCallback((id, count) => {
        UpdateCartItem(id, count);
    }, 500);

    useEffect(() => {
        const initialQuantities = {};
        cart?.itemsV2?.items.forEach(item => {
            initialQuantities[item.id] = item.quantity;
        });
        setQuantities(initialQuantities);
    }, [cart]);

    

    const handleCloseDrawer = () => {
        dispatch(closeDrawer());
    };

    const cartItems = cart?.itemsV2?.items || [];

  useEffect(() => {
    const initialQuantities = cartItems.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, [cart]);

  const handleInputChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: value,
    }));
    debouncedUpdateCartItem(id, value);
  };


    const CartItem = ({ item }) => {
        return (
            <div className='relative mb-4 p-2 border rounded-lg shadow-sm'>
                <div className="flex justify-between items-center ">
                    <button
                        className="absolute top-[-5px] right-0 text-gray-500 hover:text-gray-700"
                        onClick={() => removeCartItem(item?.id)}
                    >
                        &#10005;
                    </button>
                    <div className="flex items-center">
                        <img
                            src={item?.product?.image?.url}
                            alt={item?.product?.image?.url}
                            className="w-12 h-12 object-cover rounded"
                        />
                        <div className="ml-3">
                            <p className="text-sm font-medium"> {truncateTitle(item?.product?.name)} </p>

                            {item?.__typename !== CART_TYPE.BUNDLECARTITEM ? (
                                <>
                                    <p className="text-xs text-gray-500">
                                        <Price amount={getPrice(item, 'final_price') || getPrice(item, 'regular_price')} /> x {item.quantity}
                                        = {getPrice(item, 'final_price') || getPrice(item, 'regular_price') * item.quantity}
                                    </p>
                                    {getStockStatus(item?.product?.stock_status)}
                                </>
                            ) : item?.__typename === CART_TYPE.CONFIGURABLE ?
                                <p className="text-xs text-gray-500"> {getPriceAmount(getPrice(item, 'final_price') || getPrice(item, 'regular_price'), item?.quantity)} x {item?.quantity} = {getPriceAmount(getPrice(item, 'final_price') || getPrice(item, 'regular_price'), item?.quantity) * item.quantity} </p>
                                : ''}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button className="px-2 py-1 bg-gray-200 rounded-lg" onClick={() =>
                        handleInputChange(
                          item?.id,
                          Math.max(
                            0,
                            (quantities[item?.id] || item?.quantity) - 1
                          )
                        )
                      }> <Minus size={20} /></button>
                      <input
                      min={0}
                      autoFocus
                      name="quantity"
                      type="number"
                      onChange={(e) =>
                        handleInputChange(item?.id, Number(e.target.value))
                      }
                      className="h-9 inline-flex text-base rounded-md focus:outline-none w-10 text-center quantity mx-1"
                      value={quantities[item.id] || item?.quantity}
                    />
                        
                        <button className="px-2 py-1 bg-gray-200 rounded-lg" onClick={() =>
                        handleInputChange(
                          item?.id,
                          (quantities[item?.id] || item?.quantity) + 1
                        )
                      }> <Plus size={20} /> </button>
                    </div>

                </div>
                <div>
                    <div className="mt-2 text-sm text-gray-500">
                        {['ConfigurableCartItem', 'BundleCartItem'].includes(item?.__typename) && <p className="font-semibold">Selected Options: </p>}
                        <ul className="list-none list-disc">
                            {item?.__typename === CART_TYPE.CONFIGURABLE ? item?.configurable_options.map((config, index) => (
                                <li key={index}>
                                    {config.option_label}: ${config.value_label}
                                </li>
                            )) : item?.__typename === CART_TYPE.BUNDLECARTITEM ?
                                item?.bundle_options.map((bundle, i) => (
                                    <li key={i}>
                                        {bundle.label} {bundle?.values?.map((val, index) => (
                                            <span key={index}>
                                                {val?.quantity}x {val.label} - <Price amount={val?.price} /> {index < bundle.values.length - 1 && ', '}
                                            </span>
                                        ))}
                                    </li>
                                )) : null
                            }
                        </ul>
                    </div>
                </div>
            </div>

        );
    };

    return (
        <>
            <div className="py-4 overflow-y-auto h-[calc(98vh-200px)]">
                {cart?.itemsV2?.items?.length > 0 ? (
                    cart?.itemsV2?.items?.map((item) => (
                        <CartItem item={item} />
                    ))
                ) : (
                    <div className="flex justify-center items-center h-full">
                        <EmptyCart />
                    </div>
                )}
            </div>
            {cart?.itemsV2?.items?.length > 0 && (
                <div className="p-4 border-t">
                    {cart?.prices?.discounts?.map((discount, index) => (
                        <div key={index} className="flex justify-between mb-2" >
                            <span className="text-gray-600">
                                {t(discount.label)}
                            </span>
                            <span className="text-red-600 font-semibold">
                                - <Price amount={discount?.amount?.value} />
                            </span>
                        </div>
                    ))}
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600">{t("Subtotal")}:</span>
                        <span> <Price amount={cart?.prices?.grand_total?.value} /></span>
                    </div>

                    {/* Buttons */}
                    <div className="mb-4">
                        <Link
                            href={checkOutUrl}
                            prefetch={true}
                            onClick={() => handleCloseDrawer()}
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                            {t("Checkout")}
                        </Link>
                        <button className="w-full text-gray-700 py-2 mt-2 rounded-md transition">
                            <Link
                                prefetch={true}
                                onClick={() => handleCloseDrawer()}
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                href={shopUrl}
                            >
                                {t("ContinueShopping")}
                                <span aria-hidden="true"> &rarr;</span>
                            </Link>
                            {t("or")}
                            <Link
                                prefetch={true}
                                onClick={() => handleCloseDrawer()}
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                href={shopCartUrl}
                            >
                                {t("ViewShopCart")}
                            </Link>
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
