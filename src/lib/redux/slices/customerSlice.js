import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '@/lib/graphql/apolloClient';
import { GET_CUSTOMER_DATA } from '@/lib/graphql/queries/checkout';
import { cloneDeep } from 'lodash'; // Optional: If you want to use lodash

export const fetchCustomerData = createAsyncThunk(
  'customerData/fetchCustomerData',
  async (currentPage) => {
    const { data } = await client.query({
      query: GET_CUSTOMER_DATA,
      fetchPolicy: "no-cache",
      variables: { currentPage },
    });
    return data; // Return the customer data
  }
);

const customerSlice = createSlice({
  name: 'customerData',
  initialState: {
    data: null,
    loading: true,
    error: null,
  },
  reducers: {
    clearCustomerData: (state) => {
      state.data = null; // Optional: Clear data if needed
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerData.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error
      })
      .addCase(fetchCustomerData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = cloneDeep(action.payload); // Use deep cloning
      })
      .addCase(fetchCustomerData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Set error message
      });
  },
});

export const { clearCustomerData } = customerSlice.actions;
export default customerSlice.reducer;
