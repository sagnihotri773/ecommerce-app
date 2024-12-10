import { confirm } from "@/components/Util/confirm";
import { client } from "@/lib/graphql/apolloClient";
import {
    ADD_PRODUCTS_TO_WISHLIST,
    ADD_WISHLIST_ITEMS_TO_CART,
    DELETE_WISHLIST,
    GET_WISHLIST_ITEMS,
    REMOVE_WISHLIST_ITEMS,
} from "@/lib/graphql/queries/wishlist";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { startLoading, stopLoading } from "./loadingSlice";

const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

const fetchWishlist = createAsyncThunk(
    "customer/fetchwishlist",
    async (args, { dispatch }) => {
        try {
            const { data } = await client.query({
                query: GET_WISHLIST_ITEMS,
                fetchPolicy: "no-cache",
            });
            return data;
        } catch (error) {
            throw error;
        }
    }
);

const addProductToWishlist = createAsyncThunk(
    "customer/addProductToWishlist",
    async ({ wishlistId, sku, quantity }, { dispatch,getState }) => {
        
        try {
            if (wishlistId) {
                const { data } = await client.mutate({
                    mutation: ADD_PRODUCTS_TO_WISHLIST,
                    variables: { wishlistId, sku, quantity },
                    fetchPolicy: "no-cache",
                });
                dispatch(fetchWishlist())
                dispatch(startLoading());
                toast.success(`${sku} has been successfully added to your wishlist!`);
                dispatch(stopLoading());
                return data;
            } else {
                toast.info("Please login first to add items to your wishlist");
            }
        } catch (error) {
            toast.error(error?.message);
        }
    }
);

const removeItemsFromWishlist = createAsyncThunk(
    "customer/removeWishlistItem",
    async ({ wishlistItemsIds }, { dispatch, getState }) => {
        try {
            const state = getState();
            const wishlistId =
                state?.wishlist?.wishlist?.customer?.wishlists?.[0]?.id;
            const confirmDelete = await confirm({
                title: "Delete Confirmation",
                confirmation:
                    "Are you sure you want to remove this item from your wishlist?",
            });
            if (confirmDelete) {
                const { data } = await client.mutate({
                    mutation: REMOVE_WISHLIST_ITEMS,
                    variables: { wishlistId, wishlistItemsIds },
                    fetchPolicy: "no-cache",
                });
                toast.success("Product successfully removed from wishlist");
                dispatch(fetchWishlist());
                return data?.wishlist;
            }
        } catch (error) {
            toast.error(error?.message);
        }
    }
);

const addWishlistItemsToCart = createAsyncThunk(
    "customer/addWishlisItemsToCart",
    async ({ wishlistItemIds }, { dispatch, getState }) => {
        const state = getState();
        const wishlistId =
            state?.wishlist?.wishlist?.customer?.wishlists?.[0]?.id;
        try {
            const { data } = await client.mutate({
                mutation: ADD_WISHLIST_ITEMS_TO_CART,
                variables: { wishlistId, wishlistItemIds },
                fetchPolicy: "no-cache",
            });
            toast.success("Product added to the cart successfully!");
            dispatch(fetchWishlist());
            return data?.wishlist;
        } catch (error) {
            toast.error(error?.message);
        }
    }
);

const deleteWishlist = createAsyncThunk(
  "customer/removeWishlist",
  async (_,{ dispatch, getState }) => {
    const state = getState();
    const wishlist_id = state?.wishlist?.wishlist?.customer?.wishlists?.[0]?.id;
    
    try {
        const confirmDelete = await confirm({
          title: "Delete Confirmation",
          confirmation:
            "Are you sure you want to delete all items from your wishlist?",
        });
      if (confirmDelete) {
        const { data } = await client.mutate({
          mutation: DELETE_WISHLIST,
          variables: { wishlist_id },
          fetchPolicy: "no-cache",
        });
        dispatch(fetchWishlist());
        toast.info(data?.deleteWishlist?.message)
        return data;
      }
    } catch (error) {
      toast.error(error?.message);
    }
  }
);


export const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        wishlist: {},
    }, reducers: {
        resetWishlist: (state) => {
            state.wishlist = {}; 
        },},

    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                if (action.payload) {
                    state.wishlist = action.payload;
                }
            })
            .addCase(removeItemsFromWishlist.fulfilled, (state, action) => {
                if (action.payload) {
                    state.wishlist = action.payload;
                }
            })
            .addCase(removeItemsFromWishlist.rejected, (state, action) => {
                console.log("error", action.payload);
            })
            .addCase(addProductToWishlist.fulfilled, (state, action) => {
                if (action.payload) {
                    state.wishlist = action.payload;
                }
            })
            .addCase(addWishlistItemsToCart?.fulfilled, (state, action) => {
                if (action.payload) {
                    state.wishlist = action.payload;
                }
            });
    },
});

export default wishlistSlice.reducer;
export const { resetWishlist } = wishlistSlice.actions;

export {
    fetchWishlist,
    removeItemsFromWishlist,
    addProductToWishlist,
    addWishlistItemsToCart,
    deleteWishlist
};
