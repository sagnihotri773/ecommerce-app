"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customerStatus, updateInitiatingCart } from "@/lib/redux/slices/cartSlice";

export default function GetData() {
  const dispatch = useDispatch();

  // Select specific state values for optimized reactivity
  const { initiating_cart, cart_id, fetching_cart } = useSelector((state) => state.customer);

  useEffect(() => {
    // Initiate cart if not already initiating
    if (!initiating_cart) {
      dispatch(updateInitiatingCart(true));
    } else if (initiating_cart && !cart_id) {
      // Logic to initialize the cart (e.g., initCart action)
      dispatch(customerStatus());
    } else if (cart_id && fetching_cart) {
      // Logic to fetch the cart (e.g., fetchCart action)
      // Example: dispatch(fetchCart(cart_id));
    }
  }, [initiating_cart, cart_id, fetching_cart, dispatch]);

  return null;
}
