import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { gql, useQuery} from "@apollo/client";
import { client } from "@/lib/graphql/apolloClient";

const GET_CURRENCIES = gql`
  {
    currency {
      base_currency_code
      base_currency_symbol
      default_display_currency_code
      default_display_currency_symbol
      available_currency_codes
      exchange_rates {
        currency_to
        rate
      }
    }
  }
`;
const fetchCurrency = createAsyncThunk("currency/fetchCurrency", async (_, { dispatch }) => {
    try {
        const { data } = await client.query({
            query: GET_CURRENCIES
        });
        return data.currency;
    } catch (error) {
        throw error;
    }
});

const initialState = {
    storeCurrency: null,
    baseCurrency: null,
    availableCurrencies: [],
    exchangeRates: []
};

export const currencySlice = createSlice({
    name: "currency",
    initialState,
    reducers: {
        setCurrency: (state, action) => {
            state.storeCurrency = action.payload;
            localStorage.setItem('currency', state.storeCurrency )
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCurrency.fulfilled, (state, action) => {
            const { 
                base_currency_code, 
                available_currency_codes, 
                exchange_rates 
            } = action.payload;
    
            // Return a new state object for immutability
            return {
                ...state, // Keep other state properties intact
                baseCurrency: base_currency_code,
                availableCurrencies: [...available_currency_codes], // Avoid direct mutation
                exchangeRates: [...exchange_rates], // Avoid direct mutation
                storeCurrency: (() => {
                    const storedCurrency = localStorage.getItem('currency');
                    return storedCurrency && available_currency_codes.includes(storedCurrency)
                        ? storedCurrency
                        : base_currency_code;
                })()
            };
        });
    }
    
});
export const { setCurrency } = currencySlice.actions
export default currencySlice.reducer;
export { fetchCurrency };