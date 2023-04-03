import { configureStore } from "@reduxjs/toolkit";
import asideReducer from "./features/aside/slice";
import rootClickReducer from "./features/root_click/slice";

const store = configureStore({
  reducer: {
    aside: asideReducer,
    rootClick: rootClickReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
