// ConfigurableProduct

"use client"
import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client';
import { ADD_CONFIGURABLE_PRODUCTS_TO_CART } from '@/lib/graphql/queries/products';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { fetchCart, initCart } from '@/lib/redux/slices/cartSlice';
import { openDrawer } from '@/lib/redux/slices/drawerSlice';
import { addProductToWishlist } from '@/lib/redux/slices/wishlistSlice';

import dynamic from 'next/dynamic';
import { truncateTitle } from '@/components/Util/commonFunctions';
import { startLoading, stopLoading } from '@/lib/redux/slices/loadingSlice';
const AddToCartButtonV3 = dynamic(() => import('@/components/Util/Button/AddToCartButtonV3'), { ssr: false });
const ProductQuantityStyleTwo = dynamic(() => import('@/components/Common/ProductQuantity/StyleTwo'), { ssr: false });
const WishList = dynamic(() => import('@/components/Wishlist/WishList'), { ssr: false });
const CustomizeOptions = dynamic(() => import('@/components/Common/customizableOptions/main'), { ssr: false });

export default function ConfigurableProductOptionTwo({ data, priceFunction }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [errorMessages, setErrorMessages] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProductsAvailable, setSelectedProductsAvailable] = useState(false);
  const [addConfigurableProductToCart] = useMutation(
    ADD_CONFIGURABLE_PRODUCTS_TO_CART
  );
  const dispatch = useDispatch();

  const { cart_id } = useSelector((state) => state.customer);

  useEffect(() => {
    if (data.__typename === "ConfigurableProduct" && Object.entries(selectedOptions).length !== 0) {
      const variant = findMatchingVariant();
      if (variant?.product) {
        priceFunction(variant?.product?.price?.regularPrice?.amount?.value);
        setSelectedProductsAvailable(true);
        // setStockStatus('');
      } else {
        priceFunction(0.00);
        setSelectedProductsAvailable(false);
        // setStockStatus('OUT_OF_STOCK');
      }
    }
  }, [data, selectedOptions]);

  const increaseCount = () => {
    setQuantity(quantity + 1);
  };

  const decreaseCount = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleOptionChange = (attributeCode, valueIndex) => {
    setSelectedOptions((prevOptions) => {
      if (valueIndex) {
        return {
          ...prevOptions,
          [attributeCode]: valueIndex,
        };
      } else {
        const updatedOptions = { ...prevOptions };
        delete updatedOptions[attributeCode];
        return updatedOptions;
      }
    });
    setErrorMessages('');
  };

  const findMatchingVariant = () => {
    return data?.variants?.find((variant) =>
      variant?.attributes?.every(
        (attribute) => selectedOptions[attribute.code] == attribute.value_index
      )
    );
  };

  const handleAddToCart = () => {
    const missingOptions = data.configurable_options
      .filter((option) => selectedOptions[option.attribute_code] === undefined)
      .map((option) => option.label);

    if (missingOptions.length > 0) {
      setErrorMessages(`Please select the following options: ${missingOptions.join(', ')}`);
      return;
    }
    const variant = findMatchingVariant();
    if (!variant?.product?.sku) {
      return toast.warning('Sorry, the selected product is currently out of stock.')
    }
    setIsLoading(true);
    dispatch(startLoading());
    addConfigurableProductToCart({
      variables: {
        parent_sku: data.sku,
        cartId: cart_id,
        parentSku: data.sku,
        sku: variant?.product?.sku,
        quantity,
      },
      update: (cache, data) => {
        setIsLoading(false);
        dispatch(fetchCart(cart_id));
      },
      onCompleted(res) {
        setIsLoading(false);
        setQuantity(1);
        toast.success(`${truncateTitle(variant?.product?.sku)} has been added to your cart.`);
        dispatch(openDrawer({ type: "cart", title:" Your Shopping Cart" }));
        dispatch(stopLoading());
      },
      onError: ({ graphQLErrors }) => {
        setIsLoading(false);
        localStorage.removeItem("cart_id");
        dispatch(initCart());
        dispatch(stopLoading());
        var error = graphQLErrors.reduce(
          (r, i) => r.concat(i?.message),
          []
        );
        return toast.error(error[0] || error);
      }
    });
  }
  

  const { data: customerData } = useSelector((state) => state.customerData);
  const wishlistId = customerData?.customer?.wishlists[0].id;


  const handleAddToWishlist = async () => {
    try {
      await dispatch(
        addProductToWishlist({ wishlistId, sku: data?.sku, quantity })
      );
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
return (
    <>
      <div className="grid lg:grid-cols-1 grid-cols-1 gap-6 mt-4">
        <CustomizeOptions
          product={data}
          selectedOptions={selectedOptions}
          handleOptionChange={handleOptionChange}
          errorMessages={errorMessages}
        />
       
      </div>
      <div className="mt-4 space-x-1 flex gap-3">
      <ProductQuantityStyleTwo
          increaseCount={increaseCount}
          decreaseCount={decreaseCount}
          count={quantity}
          setQuantity={setQuantity}
        />
        {/* {selectedProductsAvailable && */}
        <AddToCartButtonV3
          isLoading={isLoading}
          callback={(e) => handleAddToCart()}
          title={"Add to Cart"}
        /> 
      </div>
        <WishList />
    </>
  )
} 
