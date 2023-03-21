import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  path: null,
  vodkaDrinks: [],
  ginDrinks: [],
  whiskeyDrinks: [],
  darkToggle: false
};


export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updatePath: (state, action) => {
        state.path = action.payload;
    },
    updateVodkaDrinks: (state, action) => {
      state.vodkaDrinks = action.payload;
    },
    updateGinDrinks: (state, action) => {
      state.ginDrinks = action.payload;
    },
    updateWhiskeyDrinks: (state, action) => {
      state.whiskeyDrinks = action.payload;
    },
    toggleDark: (state, action) => {
      state.darkToggle = action.payload;
    },
  },
});

export const { updatePath, updateVodkaDrinks, updateGinDrinks, updateWhiskeyDrinks, toggleDark} = appSlice.actions;
export const selectPath = (state) => state.app.path;
export const selectVodka = (state) => state.app.vodkaDrinks;
export const selectGin = (state) => state.app.ginDrinks;
export const selectWhiskey = (state) => state.app.whiskeyDrinks;
export const selectToggle = (state) => state.app.darkToggle;


export default appSlice.reducer;