import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAdmin: false
  };

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setIsAdmin: (state, { payload }) => {
      state.isAdmin = payload;
    },

 
  },
});

export const adminActions = adminSlice.actions;

export default adminSlice.reducer;
