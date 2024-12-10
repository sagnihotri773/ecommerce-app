"use client";
import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_SIMPLE_PRODUCT_TO_CART, GET_PRODUCT_WITH_PRICE_TIERS } from "@/lib/graphql/queries/products";
import { useDispatch, useSelector } from "react-redux";
import { validateProductOptions } from "./Extra";
import { fetchCart, initCart } from "@/lib/redux/slices/cartSlice";
import { toast } from "react-toastify";
import { openDrawer } from "@/lib/redux/slices/drawerSlice";
import { getDynamicData } from "../Util/commonGraphQuery";
import "react-toastify/dist/ReactToastify.css";
import dynamic from 'next/dynamic';
// const AddToCartButton = dynamic(() => import('@/components/Util/Button/AddToCartButton'), { ssr: false });
const WishList = dynamic(() => import('@/components/Wishlist/WishList'), { ssr: false });
const Price = dynamic(() => import('@/components/Currency/Price'), { ssr: false });
// const ProductQuantity = dynamic(() => import('@/components/Product/Quantity'), { ssr: false });
const ProductSize = dynamic(() => import('@/components/Product/ProductSize'), { ssr: false });
import { startLoading, stopLoading } from '@/lib/redux/slices/loadingSlice';
// import HoverAddToCartButtonV2 from "../Util/Button/HoverAddToCartButtonV2";
// import WishListButtonV2 from "../Util/Button/WishlistButtonV2";
const StickyAddToCart = dynamic(() => import('./StickyAddToCart'), { ssr: false });
const ProductQuantityStyleTwo = dynamic(() => import('@/components/Common/ProductQuantity/StyleTwo'), { ssr: false });
const HoverAddToCartButtonV4 = dynamic(() => import('@/components/Util/Button/AddToCartButtonV4'), { ssr: false });


export default function SimpleProduct({ data, priceFunction }) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [tiersPrice, setTiersPrice] = useState([]);
  const [addSimpleProductToCart, { loading }] = useMutation(ADD_SIMPLE_PRODUCT_TO_CART);
  const dispatch = useDispatch();
  const { cart_id } = useSelector((state) => state.customer);

  useEffect(() => {
    if (data.__typename === "SimpleProduct") {
      priceFunction(
        data?.price_range?.minimum_price?.final_price?.value ||
        data?.price_range?.regular_price?.amount?.value
      );
      getProductTiersPrice();
    }
  }, [data]);

  const getProductTiersPrice = async () => {
    const result = await getDynamicData(GET_PRODUCT_WITH_PRICE_TIERS, { search: "t-shirt-demo" });
    setTiersPrice(result?.products?.items)
  }

  useEffect(() => {
    if (tiersPrice) {
      const product = tiersPrice[0];
      const priceTiers = product?.tier_prices;
      const applicableTier = priceTiers?.reduce((prev, current) => {
        return (quantity >= current.qty && current.qty > prev.qty) ? current : prev;
      }, { qty: 0, value: data?.price_range?.minimum_price?.final_price?.value || data?.price_range?.regular_price?.amount?.value });

      if (applicableTier) {
        // priceFunction(applicableTier.value);
      } else {
        priceFunction(data?.price_range?.minimum_price?.final_price?.value || data?.price_range?.regular_price?.amount?.value);
      }
    }
  }, [tiersPrice, quantity]);

  const increaseCount = () => {
    setQuantity(quantity + 1);
  };

  const decreaseCount = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    if (!validateProductOptions(data)) {
      return;
    }
    dispatch(startLoading());
    addSimpleProductToCart({
      variables: {
        cartId: cart_id,
        sku: data.sku,
        quantity,
      },
      onCompleted(res) {
        setIsLoading(false);
        toast.success(`${data.sku} has been added to your cart.`);
        setQuantity(1);
        dispatch(openDrawer({ type: "cart", title: " Your Shopping Cart" }));
        dispatch(stopLoading());
      },
      update: (cache, data) => {
        setIsLoading(false);
        dispatch(fetchCart(cart_id));
        dispatch(stopLoading());
      },
      onError: ({ graphQLErrors }) => {
        localStorage.removeItem("cart_id");
        setIsLoading(false);
        dispatch(initCart());
        dispatch(stopLoading());
        var error = graphQLErrors.reduce((r, i) => r.concat(i?.message), []);
        return toast.error(error[0] || error);
      },
    });
  };

  const product = tiersPrice[0];
  const priceTiers = product?.price_tiers;
  const showLoadingState = [undefined, 0].includes(priceTiers?.length);

  return (
    <>
      <div className="grid lg:grid-cols-1 grid-cols-1 gap-3" id="original-add-to-cart">
        {data?.items?.length > 0 ? (
          <ProductSize data={(data?.configurable_options, "size")} />
        ) : (
          ""
        )}
        {priceTiers?.length > 0 ? (
            priceTiers?.map((tier) => (
              tier.discount.percent_off ?
                <span key={tier.quantity}>
                  Buy {tier.quantity} for {tier.final_price.currency} <Price amount={tier.final_price.value.toFixed(2) / tier.quantity} /> each and save {tier.discount.percent_off}% 
                </span> : ''
            ))
        ) : showLoadingState ? <div className="w-3/5 h-4 bg-gray-300 animate-pulse rounded" ></div> : (
          <p>No tiered pricing available</p>
        )}
        <ProductQuantityStyleTwo
          increaseCount={increaseCount}
          decreaseCount={decreaseCount}
          count={quantity}
          setQuantity={setQuantity}
        />
      </div>
      <div className="mt-4 space-x-1">
        <HoverAddToCartButtonV4
          isLoading={loading}
          callback={(e) => handleAddToCart()}
        />
        <WishList data={data} quantity={quantity} />
      </div>

      <StickyAddToCart
        data={data}
        ProductQuantityStyleTwo={(props) => (
          <ProductQuantityStyleTwo
            increaseCount={increaseCount}
            decreaseCount={decreaseCount}
            count={quantity}
            setQuantity={setQuantity}
            {...props}
            hideTitle={false}
          />
        )}
        HoverAddToCartButtonV4={(props) => (
          <HoverAddToCartButtonV4
            isLoading={loading}
            callback={(e) => handleAddToCart()}
            {...props}
          />
        )}
      />
    </>
  );
}
