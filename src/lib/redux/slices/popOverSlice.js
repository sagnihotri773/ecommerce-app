import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    openHideLayout: false,
    popoverProduct: null,
};

const popoverSlice = createSlice({
    name: 'popover',
    initialState,
    reducers: {
        openPopover: (state, action) => {
            state.openHideLayout = true;  
            state.popoverProduct = action.payload;
        },
        closePopover: (state) => {
            state.openHideLayout = false;  
            state.popoverProduct = null;  
        },
    },
});

export const { openPopover, closePopover } = popoverSlice.actions;
export default popoverSlice.reducer;
