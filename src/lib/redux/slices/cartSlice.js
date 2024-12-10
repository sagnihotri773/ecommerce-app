import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "@/lib/graphql/apolloClient";
import { CART, CREATE_GUEST_CART_RAW, CREATE_CUSTOMER_CART_RAW, MERGE_CART, CUSTOMER_CART, REMOVE_ITEM_FROM_CART, UPDATE_CART_ITEMS, CLEAR_CUSTOMER_CART } from "@/lib/graphql/queries/shoppingCart";
import { confirm } from "@/components/Util/confirm";
import { toast } from "react-toastify";
import { REMOVE_COUPON_FROM_CART } from "@/lib/graphql/queries/checkout";
import "react-toastify/dist/ReactToastify.css";

const fetchCart = createAsyncThunk("customer/fetchCart", async (args, { dispatch, getState }) => {
  try {
    const cartId = typeof window !== "undefined" ? localStorage.getItem('cart_id') || '' : '';
    const { data } = await client.query({
      query: CART,
      variables: { cart_id: cartId },
      fetchPolicy: 'no-cache'
    });
    return data.cart;
  } catch (error) {
    throw error;
  }
});


const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async ({ cart_id, cart_item_id }, { dispatch }) => {
    try {
      const confirmDelete = await confirm({
        title: "Delete Confirmation",
        confirmation:
          "Are you sure you want to remove this item from your cart?",
      });

      if (confirmDelete) {
        const { data } = await client.mutate({
          mutation: REMOVE_ITEM_FROM_CART,
          variables: { cart_id, cart_item_id },
          fetchPolicy: "no-cache",
        });
        toast.success("Your item has been successfully removed from the cart.");

        dispatch(fetchCart());

        return data.cart;
      }
    } catch (error) {

      toast.error("Failed to remove item from the cart.");
    }
  }
);


const updateCartItemsQuantity = createAsyncThunk(
  "cart/updateCartItems",
  async ({ id, count, cartId, productType, options }, { dispatch }) => {
    if (count !== 0 && !count) {
      return;
    }
    try {
      let cartQuantity = parseFloat(count);
      if (cartQuantity === 0) {
        dispatch(removeItemFromCart({ cart_id: cartId, cart_item_id: id }));
      } else {
        let cartItemsInput = {
          cart_item_id: id,
          quantity: cartQuantity,
        };

        if (productType === "configurable" && options?.customizable_options) {
          cartItemsInput.customizable_options = options.customizable_options;
        }

        if (productType === "bundle" && options?.bundle_options) {
          cartItemsInput.bundle_options = options.bundle_options;
        }

        if (productType === "grouped" && options?.grouped_items) {
          cartItemsInput.grouped_items = options.grouped_items;
        }

        const { data } = await client.mutate({
          mutation: UPDATE_CART_ITEMS,
          variables: {
            cart_id: cartId,
            cart_items: [cartItemsInput]
          },
          fetchPolicy: "no-cache",
        });

        if (cartId) {
          dispatch(fetchCart(cartId));
        }

        return data?.cart;
      }
    } catch (error) {
      toast.error("Failed to update the item in the cart.");
    }
  }
);


const removeCouponFromCart = createAsyncThunk("customer/removeCouponFromCart", async ({ cart_id }, { dispatch }) => {
  try {

    const confirmDelete = await confirm({
      title: "Delete Confirmation",
      confirmation:
        "Are you sure you want to delete this coupon from your cart?",
    });

    if (confirmDelete) {

      const { data } = await client.mutate({
        mutation: REMOVE_COUPON_FROM_CART,
        variables: { cart_id },
        fetchPolicy: 'no-cache'
      });
      dispatch(fetchCart())
      toast.success("Coupon code has been successfully removed from your cart.")
      return data;
    }
  } catch (error) {
    toast.error(error?.message)
  }
});

const customerStatus = createAsyncThunk("customer/status", async (args, { dispatch }) => {
  const token = typeof window !== "undefined" ? localStorage.getItem('token') : null;
  const cart_id = typeof window !== "undefined" ? localStorage.getItem('cart_id') || '' : '';
  if (token) {
    try {
      const res = await client.query({
        query: CUSTOMER_CART,
        fetchPolicy: 'no-cache'
      });
      if (typeof window !== "undefined") {
        localStorage.setItem('cart_id', res.data.customerCart.id)
      }
      dispatch(fetchCart());
    } catch (e) {
      if (typeof window !== "undefined") {
        localStorage.clear("cart_id")
      }
      dispatch(initCart());
    }
  } else {
    if (typeof window !== "undefined" && !cart_id) {
      dispatch(initCart());
    } else {
      dispatch(fetchCart());
    }
  }
  return true;
});

const initCart = createAsyncThunk("customer/initCart", async (args, { dispatch }) => {
  let cartId;
  try {
    const type = typeof window !== "undefined" && localStorage.getItem('token') ? 'customer' : 'guest';
    if (type === "guest") {
      const res = await client.mutate({
        mutation: CREATE_GUEST_CART_RAW,
        fetchPolicy: 'no-cache'
      });
      cartId = res.data.createGuestCart.cart.id;
    } else {
      const res = await client.query({
        query: CREATE_CUSTOMER_CART_RAW,
        fetchPolicy: 'no-cache'
      });
      cartId = res.data.customerCart.id;
    }
  } catch (error) {
    console.log(error);
  }

  dispatch(fetchCart());
  return cartId;
});

const mergeCart = createAsyncThunk("customer/mergeCart", async (args, { dispatch }) => {
  try {
    const sourceCartId = typeof window !== "undefined" ? localStorage.getItem('cart_id') || '' : '';
    const res = await client.mutate({
      mutation: MERGE_CART,
      fetchPolicy: 'no-cache',
      variables: { source_cart_id: sourceCartId }
    });
    return res?.data?.mergeCarts?.id;
  } catch (error) {
    throw error;
  }
});

const clearCustomerCart = createAsyncThunk(
  "clear/cartItems",
  async ({ cart_id }, { dispatch }) => {
    try {
      const confirmDelete = await confirm({
        title: "Delete Confirmation",
        confirmation:
          "Are you sure you want to remove all the item from your cart?",
      });
      if (confirmDelete) {

        const { data } = await client.mutate({
          mutation: CLEAR_CUSTOMER_CART,
          variables: { cart_id },
          fetchPolicy: "no-cache",
        });
        dispatch(fetchCart());
        toast.success(data?.clearCart?.message);
        return data;
      }
    } catch (error) {
      toast.error(error?.message);
    }
  }
);

export const customerSlice = createSlice({
  name: "customer",
  initialState: {
    token: typeof window !== "undefined" ? localStorage.getItem('token') || '' : '',
    cart_id: typeof window !== "undefined" ? localStorage.getItem('cart_id') || '' : '',
    cart_open: false,
    cart: {},
    fetching_cart: false,
    initiating_cart: false,
    isPopupOpen: false,
    loading: true,
    clearCartLoading: false,
  },
  reducers: {
    togglePopup: (state) => {
      state.isPopupOpen = !state.isPopupOpen;
    },
    closePopup: (state) => {
      state.isPopupOpen = false;
    },
    updateCartId: (state, action) => {
      state.cart_id = action.payload.cart_id;
      if (typeof window !== "undefined") {
        localStorage.setItem('cart_id', state.cart_id);
      }
    },
    updateToken: (state, action) => {
      state.token = action.payload.token;
      if (typeof window !== "undefined") {
        localStorage.setItem('token', state.token);
      }
    },
    updateInitiatingCart: (state, action) => {
      state.initiating_cart = action.payload;
    },
    updateFetchingCart: (state, action) => {
      state.fetching_cart = action.payload;
    },
    getCustomerData(state) {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem('token');
        const cart_id = localStorage.getItem('cart_id');
        state.token = token;
        state.cart_id = cart_id;
      }
    },
    cartOpen: (state, action) => {
      state.cart_open = action.payload.cart_open;
    },
    resetCart: (state) => {
      state.customer = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.initiating_cart = false;
        if (action.payload) {
          state.cart = action.payload;
          state.fetching_cart = false;
          if (typeof window !== "undefined") {
            localStorage.setItem('cart_id', action.payload.id);
          }
        }
      })
      .addCase(initCart.fulfilled, (state, action) => {
        state.initiating_cart = false;
        state.loading = false;
        if (action.payload) {
          state.cart_id = action.payload;
          if (typeof window !== "undefined") {
            localStorage.setItem('cart_id', state.cart_id);
          }
        }
      }).addCase(mergeCart.fulfilled, (state, action) => {
        if (action.payload) {
          state.cart_id = action.payload;
          if (typeof window !== "undefined") {
            localStorage.setItem('cart_id', state.cart_id);
          }
        }
      }).addCase(removeItemFromCart.fulfilled, (state, action) => {
        if (action?.payload) {

          state.cart = action.payload;
        }
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
      }).addCase(updateCartItemsQuantity.fulfilled, (state, action) => {
        if (action.payload) {

          state.cart = action.payload;
        }
      })
      .addCase(updateCartItemsQuantity.rejected, (state, action) => {
        console.error("Item removal failed:", action.payload);
      })
      .addCase(fetchCart.rejected, (state) => {
        state.loading = false;
      })
      .addCase(initCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(initCart.rejected, (state) => {
        state.loading = false;
      })
      .addCase(clearCustomerCart.pending, (state) => {
        state.clearCartLoading = true; // Set loading to true
      })
      .addCase(clearCustomerCart.fulfilled, (state) => {
        state.clearCartLoading = false; // Set loading to false
      })
      .addCase(clearCustomerCart.rejected, (state) => {
        state.clearCartLoading = false; // Set loading to false
      });
  }
});

export const { updateCartId, updateToken, getCustomerData, cartOpen, updateInitiatingCart, updateFetchingCart, togglePopup, closePopup, resetCart } = customerSlice.actions;

export default customerSlice.reducer;

export { fetchCart, initCart, mergeCart, customerStatus, removeItemFromCart, updateCartItemsQuantity, removeCouponFromCart, clearCustomerCart };
