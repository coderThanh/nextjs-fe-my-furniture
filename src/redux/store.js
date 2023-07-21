import { configureStore } from '@reduxjs/toolkit'
import asideReducer from './features-root/aside/slice'

const store = configureStore({
  reducer: {
    aside: asideReducer,
  },
})

export default store
