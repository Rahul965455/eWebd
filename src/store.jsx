import { configureStore, createSlice } from '@reduxjs/toolkit'
import cartReducer from './Component/Redux/CreateCart'

const store  = configureStore({
  reducer: cartReducer
})
  
export  default store
