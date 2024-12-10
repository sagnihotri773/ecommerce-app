import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openHideLayout: false,
};

const popOverSlice = createSlice({
  name: 'newletter',
  initialState,
  reducers: {
    openPopover: (state) => {
      state.openHideLayout = true;
    },
    closePopover: (state) => {
      state.openHideLayout = false;
    },
    togglePopover: (state) => {
      state.openHideLayout = !state.openHideLayout;
    },
  },
});

export const { openPopover, closePopover, togglePopover } = popOverSlice.actions;

export default popOverSlice.reducer;
