"use client"
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_SIMPLE_PRODUCT_TO_CART } from '@/lib/graphql/queries/products';
import { fetchCart, initCart } from '@/lib/redux/slices/cartSlice';
import { openDrawer } from '@/lib/redux/slices/drawerSlice';
import "react-toastify/dist/ReactToastify.css";

import dynamic from 'next/dynamic';
import { truncateTitle } from '../Util/commonFunctions';
const AddToCartButton = dynamic(() => import('@/components/Util/Button/AddToCartButton'), { ssr: false });
const WishList = dynamic(() => import('@/components/Wishlist/WishList'), { ssr: false });
const ProductQuantity = dynamic(() => import('@/components/Product/Quantity'), { ssr: false });

export default function DownloadableProduct({ data, priceFunction }) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { cart_id } = useSelector((state) => state.customer);
  const [addSimpleProductToCart] = useMutation(ADD_SIMPLE_PRODUCT_TO_CART);
  const dispatch = useDispatch();

  const { sku, name, price_range } = data;

  useEffect(() => {
    if (data.__typename === "DownloadableProduct") {
      priceFunction(price_range?.minimum_price?.final_price?.value || price_range?.regular_price?.amount?.value);
    }
  }, [data]);

  const handleAddToCart = () => {
    addSimpleProductToCart({
      variables: {
        cartId: cart_id,
        sku: sku,
        quantity,
      },
      onCompleted(res) {
        toast.success(`${truncateTitle(name)} has been added to your cart.`);
        setQuantity(1);
        dispatch(openDrawer({ type: "cart", title:" Your Shopping Cart" }));

      },
      update: (cache, data) => {
        setIsLoading(false);
        dispatch(fetchCart(cart_id));
      },
      onError: ({ graphQLErrors }) => {
        localStorage.removeItem("cart_id");
        setIsLoading(false);
        dispatch(initCart());
        var error = graphQLErrors.reduce(
          (r, i) => r.concat(i?.message),
          []
        );
        return toast.error(error[0] || error);
      },
    });
  };

  const increaseCount = () => {
    setQuantity(quantity + 1);
  };

  const decreaseCount = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };


  return (
    <div className="grid lg:grid-cols-1 grid-cols-1 gap-6 mt-4">

      <ProductQuantity
        increaseCount={increaseCount}
        decreaseCount={decreaseCount}
        count={quantity}
        setQuantity={setQuantity}
      />

      <div className="mt-4 space-x-1">
        {/* {selectedProductsAvailable && */}
        <AddToCartButton
          isLoading={isLoading}
          callback={(e) => handleAddToCart()}
          title={"Add to Cart"}
        />
        {/* } */}
        <WishList data={data} quantity={quantity} />
      </div>

    </div>
  )
}
