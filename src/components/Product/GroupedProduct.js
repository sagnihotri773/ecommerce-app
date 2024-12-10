import React, { useEffect, useState } from 'react';
import { ADD_GROUPED_PRODUCT_TO_CART } from '@/lib/graphql/queries/products';
import { fetchCart, initCart } from '@/lib/redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { openDrawer } from '@/lib/redux/slices/drawerSlice';

import dynamic from 'next/dynamic';
const AddToCartButton = dynamic(() => import('@/components/Util/Button/AddToCartButton'), { ssr: false });
const WishList = dynamic(() => import('@/components/Wishlist/WishList'), { ssr: false });
const GroupedProduct = dynamic(() => import('@/components/Product/GroupedProductOption'), { ssr: false });
import "react-toastify/dist/ReactToastify.css";
import { truncateTitle } from '../Util/commonFunctions';


export default function groupedProduct({ data, priceFunction }) {
    const [errorMessages, setErrorMessages] = useState({});
    const [selectedOptions, setSelectedOptions] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [addGroupedProductToCart] = useMutation(ADD_GROUPED_PRODUCT_TO_CART);
    const { cart_id } = useSelector((state) => state.customer);
    const dispatch = useDispatch();

    useEffect(() => {
        if (data.__typename === "GroupedProduct") {
            priceFunction();
        }
    }, [data, selectedOptions]);

    const handleAddToCart = () => {
        if (!validateProductOptions(data)) {
            return;
        }
        setErrorMessages({});
        setIsLoading(true);
        const groupedItems = data.items.map((item) => ({
            sku: item.product.sku,
            quantity: selectedOptions[data.sku]?.[item.product.sku] || 1,
        }));
        addGroupedProductToCart({
            variables: {
                cartId: cart_id,
                items: groupedItems,
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

            },
            onError: (error) => {
                setIsLoading(false);
                localStorage.removeItem("cart_id");
                dispatch(initCart());
                return toast.error(error[0] || error);
            },
        });
    }

    const validateProductOptions = (product) => {
        let isValid = true;
        let errors = {};

        if (product.__typename === "GroupedProduct") {
            const allEmpty = product.items.every(
                (item) => !selectedOptions[product.sku]?.[item.product.sku]
            );
            if (allEmpty) {
                isValid = false;
                errors.general = "Please select at least one item.";
            }
        }
        if (!isValid) {
            setErrorMessages({
                ...errorMessages,
                [product.sku]: errors,
            });
        }
        return isValid;
    };


    return (
        <>
            <div className="grid lg:grid-cols-1 grid-cols-1 gap-6 mt-4">
                <GroupedProduct
                    product={data}
                    errorMessages={errorMessages}
                    selectedOptions={selectedOptions}
                    setSelectedOptions={setSelectedOptions}
                />
            </div>
            <div className='my-5'>
                <AddToCartButton
                    isLoading={isLoading}
                    callback={(e) => handleAddToCart()}
                    title={"Add to Cart"}
                />
                &nbsp;
                <WishList data={data} quantity={quantity} />
            </div>
        </>
    )
}