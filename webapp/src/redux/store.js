import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../features/api/ApiSlice'
import authReducer from '../features/auth/AuthSlice'

export default configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer
  },
  middleware: getDefaultMidleware => getDefaultMidleware().concat(apiSlice.middleware),
  devTools: true
})