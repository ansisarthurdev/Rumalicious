import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  path: null,
};


export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updatePath: (state, action) => {
        state.path = action.payload;
    }
  },
});

export const { updatePath } = appSlice.actions;
export const selectPath = (state) => state.app.path;

export default appSlice.reducer;