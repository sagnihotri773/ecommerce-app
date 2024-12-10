// ConfigurableProduct

"use client"
import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client';
import { ADD_CONFIGURABLE_PRODUCTS_TO_CART } from '@/lib/graphql/queries/products';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { fetchCart, initCart, updateCartItemsQuantity } from '@/lib/redux/slices/cartSlice';
import { openDrawer } from '@/lib/redux/slices/drawerSlice';

import dynamic from "next/dynamic";
import { truncateTitle } from '../Util/commonFunctions';
import { startLoading, stopLoading } from '@/lib/redux/slices/loadingSlice';
const ProductQuantity = dynamic(() => import('@/components/Product/Quantity'), { ssr: false });
const ConfigurableProductOptions = dynamic(() => import('@/components/Common/customizableOptions/CustomizableOptionOne'), { ssr: false });
const WishList = dynamic(() => import('@/components/Wishlist/WishList'), { ssr: false });
const AddToCartButton = dynamic(() => import('@/components/Util/Button/AddToCartButton'), { ssr: false });

export default function ConfigurableProduct({ data, priceFunction }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [errorMessages, setErrorMessages] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItemID, setSelectedItemID] = useState('');
  const [addConfigurableProductToCart] = useMutation(
    ADD_CONFIGURABLE_PRODUCTS_TO_CART
  );
  const dispatch = useDispatch();

  const { cart_id, cart } = useSelector((state) => state.customer);

  useEffect(() => {
    if (data?.type === 'Edit') {
      const selectedProduct = cart?.itemsV2?.items?.find(
        (item) => item.product.sku === data.sku
      );

      setSelectedItemID(selectedProduct.id)
      if (selectedProduct) {
        const selectedAttributes = selectedProduct?.configurable_options?.reduce(
          (options, option) => {
            const matchingOption = data.configurable_options.find(
              (configOption) => configOption.label === option.option_label
            );
            const matchingValue = matchingOption?.values.find(
              (value) => value.label === option.value_label
            );
            if (matchingValue) {
              return {
                ...options,
                [matchingOption.attribute_code]: matchingValue.value_index,
              };
            }
            return options;
          },
          {}
        );
        setSelectedOptions(selectedAttributes);
        setQuantity(selectedProduct.quantity);
      }
    }
  }, [data?.type, cart]);

  useEffect(() => {
    if (data.__typename === "ConfigurableProduct" && Object.entries(selectedOptions).length !== 0) {
      const variant = findMatchingVariant();
      if (variant?.product) {
        priceFunction(variant?.product?.price?.regularPrice?.amount?.value);
      } else {
        priceFunction(0.00);
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
    if (data?.type == "Edit") {
      // const variant = findMatchingVariant();
      let result = [];
      data?.configurable_options?.forEach(option => {
        const optionName = option.label.toLowerCase();
        
        if (selectedOptions.hasOwnProperty(optionName)) {
          const selectedValue = selectedOptions[optionName];

          result.push({
            value: optionName,
            id: selectedValue
          });
        }
      }); 

      dispatch(updateCartItemsQuantity({
        id: selectedItemID,
        count: quantity,
        cartId: cart_id,
        productType: "configurable",
        options: {
          customizable_options: result,
        },
      }));
    } else {
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
          dispatch(openDrawer({ type: "cart", title: " Your Shopping Cart" }));
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
  }

  return (
    <>
      <div className="grid lg:grid-cols-1 grid-cols-1 gap-6 mt-4">
        <ConfigurableProductOptions
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
        {/* {selectedProductsAvailable && */}
        <AddToCartButton
          isLoading={isLoading}
          callback={(e) => handleAddToCart()}
          title={"Add to Cart"}
        />
        <WishList data={data} quantity={quantity} />
      </div>
    </>
  )
} 
