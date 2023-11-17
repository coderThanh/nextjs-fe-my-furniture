import { combineReducers, configureStore } from '@reduxjs/toolkit'

// root
import asideReducer from './features-root/aside-slice'

const rootReducers = combineReducers({
  aside: asideReducer,
})

const store = configureStore({
  reducer: rootReducers,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export default store
