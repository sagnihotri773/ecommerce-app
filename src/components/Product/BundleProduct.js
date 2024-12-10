"use client"
import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client';
import { ADD_BUNDLE_PRODUCT_TO_CART } from '@/lib/graphql/queries/products';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, initCart } from '@/lib/redux/slices/cartSlice';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { useTranslations } from 'next-intl';
import { openDrawer } from '@/lib/redux/slices/drawerSlice';
import { getPrice, truncateTitle } from '../Util/commonFunctions';

import dynamic from 'next/dynamic';
import { startLoading, stopLoading } from '@/lib/redux/slices/loadingSlice';
const AddToCartButton = dynamic(() => import('@/components/Util/Button/AddToCartButton'), { ssr: false });
const WishList = dynamic(() => import('@/components/Wishlist/WishList'), { ssr: false });
const BundleProduct = dynamic(() => import('@/components/Product/BundleProductOptions'), { ssr: false });
const ProductQuantity = dynamic(() => import('@/components/Product/Quantity'), { ssr: false });


export default function bundleProduct({ data, priceFunction }) {
    const [quantity, setQuantity] = useState(1);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});
    const t = useTranslations("ProductCard");
    const [addBundleProductToCart] = useMutation(ADD_BUNDLE_PRODUCT_TO_CART);
    const dispatch = useDispatch();
    const { cart_id, cart } = useSelector((state) => state.customer);

    useEffect(() => {
        if (data?.type === "Edit") {
            const selectedFields = {};

            data?.items.forEach((bundleOption) => {
                const selected = cart?.itemsV2?.items[0]?.bundle_options.find(
                    (selectedOption) => selectedOption.id === bundleOption.option_id
                );
        
                if (selected) {
                    if (selected.values.length > 1) {
                        selectedFields[bundleOption.option_id] = selected.values.map(
                            (selectedValue) => selectedValue.id
                        );
                    } else {
                        selectedFields[bundleOption.option_id] = selected.values[0].id;
                    }
                }
            });

            setSelectedOptions({'Bundel-Products' :selectedFields});

        }
    }, [data.type]);
 

    const increaseCount = () => {
        setQuantity(quantity + 1);
    };

    const decreaseCount = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    useEffect(() => {
        if (data.__typename === "BundleProduct") {
            let newTotalPrice = 0;
            data.items.forEach((item) => {
                const selectedOptionsForItem = selectedOptions[data.sku]?.[item.option_id] || [];

                if (Array.isArray(selectedOptionsForItem)) {
                    selectedOptionsForItem.forEach((selectedOption) => {
                        const option = item.options.find((o) => Number(o.id) === Number(selectedOption));
                        if (option) {
                            newTotalPrice += getPrice(option, 'final_price') || getPrice(option, 'regular_price');
                        }
                    });
                } else {
                    const option = item.options.find((o) => Number(o.id) === Number(selectedOptionsForItem));
                    if (option) {
                        newTotalPrice += getPrice(option, 'final_price') || getPrice(option, 'regular_price');
                    }
                }
            });
            if (newTotalPrice !== 0) {
                priceFunction(newTotalPrice);
            } else {
                priceFunction(0);
            }
        }
    }, [data, selectedOptions]);

    const handleOptionChange = async (productSku, attributeCode, valueIndex) => {
        setSelectedOptions({
            ...selectedOptions,
            [productSku]: {
                ...selectedOptions[productSku],
                [attributeCode]: valueIndex,
            },
        });
        setErrorMessages({
            ...errorMessages,
            [productSku]: "",
        });
    };

    const validateProductOptions = (product) => {
        let isValid = true;
        let errors = {};
        if (product.__typename === "BundleProduct") {
            product.items.forEach((item) => {
                if (!selectedOptions[product.sku]?.[item.option_id]) {
                    isValid = false;
                    errors[item.option_id] = `Please select an option for ${item.title}.`;
                }
            });
        }
        if (!isValid) {
            setErrorMessages({
                ...errorMessages,
                [product.sku]: errors,
            });
        }
        return isValid;
    };

    const handleAddToCart = () => {
        if (!validateProductOptions(data)) {
            return;
        }
        setIsLoading(true);
        dispatch(startLoading());
        const bundleOptions = data.items.map((item) => {
            const selectedValue = selectedOptions[data.sku]?.[item.option_id];
            return {
                id: item.option_id,
                value: selectedValue ? selectedValue : null,
                quantity: quantity,
            };
        });

        addBundleProductToCart({
            variables: {
                cartId: cart_id,
                sku: data.sku,
                quantity,
                bundleOptions: bundleOptions.filter(
                    (option) => option.value !== null
                ),
            },
            update: (cache, data) => {
                setIsLoading(false);
                dispatch(fetchCart(cart_id));
            },
            onCompleted(res) {
                setIsLoading(false);
                toast.success(
                    `${truncateTitle(data?.name)} has been added to your cart.`
                );
                setQuantity(1);
                dispatch(openDrawer({ type: "cart", title: " Your Shopping Cart" }));
                dispatch(stopLoading());
            },
            onError: (error) => {
                setIsLoading(false);
                dispatch(stopLoading());
                localStorage.removeItem("cart_id");
                dispatch(initCart());
                return toast.error(error[0] || error);
            },
        });
    }

    return (
        <>
            <div className="grid lg:grid-cols-1 grid-cols-1 gap-6 mt-4">
                <BundleProduct
                    product={data}
                    selectedOptions={selectedOptions}
                    handleOptionChange={handleOptionChange}
                    errorMessages={errorMessages}
                />
                <ProductQuantity
                    increaseCount={increaseCount}
                    decreaseCount={decreaseCount}
                    count={quantity}
                    setQuantity={setQuantity}
                />
            </div>
            <div className="mt-4 space-x-1">
                <AddToCartButton
                    isLoading={isLoading}
                    callback={(e) => handleAddToCart()}
                />
                <WishList data={data} quantity={quantity} />
            </div>
        </>
    )
} 