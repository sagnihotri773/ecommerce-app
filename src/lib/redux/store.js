"use client";
// store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import customerSlice from "@/lib/redux/slices/cartSlice";
import currencySlice from "@/lib/redux/slices/currency";
import storeConfigSlice from "@/lib/redux/slices/storeConfig";
import customerReducer from '@/lib/redux/slices/customerSlice';
import wishlistReducer from "@/lib/redux/slices/wishlistSlice";
import drawerReducer from "@/lib/redux/slices/drawerSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import tokenMiddleware from "./middleware/middleware";
import popoverReducer from "@/lib/redux/slices/popOverSlice"
import loadingReducer from '@/lib/redux/slices/loadingSlice';
import newletterReducer from "@/lib/redux/slices/newsLetterSlice"
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['wishlist',"customerData"],

};

const rootReducer = combineReducers({
    customer: customerSlice,
    currency: currencySlice,
    store: storeConfigSlice,
    customerData: customerReducer,
    wishlist: wishlistReducer,
    drawer: drawerReducer,
    popover:popoverReducer,
    loading: loadingReducer,
    newsLetter:newletterReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tokenMiddleware),
});


export const persistor = persistStore(store);
