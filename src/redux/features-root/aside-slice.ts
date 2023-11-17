'use client'

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLeftOpen: true,
}

export const asideSlice = createSlice({
  name: 'aside',
  initialState: initialState,
  reducers: {
    leftToggle: (state) => {
      state.isLeftOpen = !state.isLeftOpen
    },
    leftStatus: (state, actions) => {
      state.isLeftOpen = actions.payload
    },
  },
})

export const { leftToggle, leftStatus } = asideSlice.actions

export default asideSlice.reducer
