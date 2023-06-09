import { configureStore } from "@reduxjs/toolkit";
import asideReducer from "./features-root/aside/slice";

const store = configureStore({
  reducer: {
    aside: asideReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
