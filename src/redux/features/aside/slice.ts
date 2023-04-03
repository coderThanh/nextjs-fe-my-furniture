"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AsideSliceState = {
  isLeftOpen: boolean;
};

const initialState: AsideSliceState = {
  isLeftOpen: true,
};

export const asideSlice = createSlice({
  name: "aside",
  initialState: initialState,
  reducers: {
    leftToggle: (state) => {
      state.isLeftOpen = !state.isLeftOpen;
    },
    leftStatus: (state, actions: PayloadAction<boolean>) => {
      state.isLeftOpen = actions.payload;
    },
  },
});

export const { leftToggle, leftStatus } = asideSlice.actions;

export default asideSlice.reducer;
