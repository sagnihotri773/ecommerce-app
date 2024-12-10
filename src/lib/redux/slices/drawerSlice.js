import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  type: null,  
  title: '',  
};

export const uiSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    openDrawer: (state, action) => {
      state.isOpen = true;
      state.type = action.payload.type;  
      state.title = action.payload.title || '';
    },
    closeDrawer: (state) => {
      state.isOpen = false;
      state.type = null;
      state.title = '';
    },
  },
});

export const { openDrawer, closeDrawer } = uiSlice.actions;

export default uiSlice.reducer;
