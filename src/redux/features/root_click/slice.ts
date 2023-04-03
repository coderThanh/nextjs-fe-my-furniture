import { createSlice } from "@reduxjs/toolkit";

/**
 * function : this check header / main / body wrap on click
 * to close menudrop drop / popup when reducer run
 */

export type RootClickState = {
  isClickHeader: number;
  isClickMain: number;
  isClickAll: number;
};

const rootClickInitState: RootClickState = {
  isClickHeader: Math.random(),
  isClickMain: Math.random(),
  isClickAll: Math.random(),
};

export const rootClickSlice = createSlice({
  name: "rootClick",
  initialState: rootClickInitState,
  reducers: {
    clickHeader: (state) => {
      state.isClickAll = Math.random();
      state.isClickHeader = Math.random();
    },
    clickMain: (state) => {
      state.isClickAll = Math.random();
      state.isClickMain = Math.random();
    },
  },
});

export const { clickHeader, clickMain } = rootClickSlice.actions;
export default rootClickSlice.reducer;
