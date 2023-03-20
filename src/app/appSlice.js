import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  path: null,
  vodkaDrinks: [],
  ginDrinks: [],
  whiskeyDrinks: []
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
  },
});

export const { updatePath, updateVodkaDrinks, updateGinDrinks, updateWhiskeyDrinks} = appSlice.actions;
export const selectPath = (state) => state.app.path;
export const selectVodka = (state) => state.app.vodkaDrinks;
export const selectGin = (state) => state.app.ginDrinks;
export const selectWhiskey = (state) => state.app.whiskeyDrinks;


export default appSlice.reducer;