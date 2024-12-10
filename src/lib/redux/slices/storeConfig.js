import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetCurrency, STORE_CONFIG } from "@/lib/graphql/queries/storeConfig";
import { client } from "@/lib/graphql/apolloClient";
import { currentStoreCode } from "@/components/Util/commonFunctions";
import { cloneDeep } from "lodash"; // Import lodash cloneDeep

const fetchStoreConfig = createAsyncThunk("fetch/storeconfig", async () => {
  try {
    const { data } = await client.query({
      query: STORE_CONFIG,
      fetchPolicy: "no-cache",
    });
    return data;
  } catch (error) {
    throw error;
  }
});

const fetchCurrency = createAsyncThunk("fetch/currency", async () => {
  try {
    const { data } = await client.query({
      query: GetCurrency,
      fetchPolicy: "no-cache",
    });
    return data.currency;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  storeConfigData: null,
  currencyData: null,
  selectedStore: currentStoreCode,
};

export const storeSlice = createSlice({
  name: "storeConfig",
  initialState,
  reducers: {
    setStoreConfig: (state, action) => {
      state.storeConfigData = cloneDeep(action.payload.data.storeConfig); // Deep clone to avoid mutation
    },
    setCurrencyData: (state, action) => {
      state.currencyData = cloneDeep(action.payload); // Deep clone to avoid mutation
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoreConfig.fulfilled, (state, action) => {
        state.storeConfigData = cloneDeep(action.payload); // Deep clone to avoid mutation
      })
      .addCase(fetchCurrency.fulfilled, (state, action) => {
        state.currencyData = cloneDeep(action.payload); // Deep clone to avoid mutation
      });
  },
});

export const selectStoreInfo = (state, key) => {
  const { storeConfigData, selectedStore } = state.store;
  const data = storeConfigData?.availableStores?.find(
    (item) => item?.store_code === selectedStore
  );

  if (!data) return null;

  if (key === "logo" && data.header_logo_src) {
    return `${data.base_media_url}logo/${data.header_logo_src}`;
  } else if (key === "copyright") {
    return data.copyright;
  }
  return null;
};

export const selectCurrencyData = (state) => state.store.currencyData;

export const { setStoreConfig, setSelectedStore, setCurrencyData } = storeSlice.actions;
export default storeSlice.reducer;

export { fetchStoreConfig, fetchCurrency };
