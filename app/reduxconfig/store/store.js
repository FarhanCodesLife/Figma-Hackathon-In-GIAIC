import {configureStore} from '@reduxjs/toolkit'
import cartReducer from '../reducer/cartSlice'
import wishReducer from '../reducer/wishSlice'


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        wish: wishReducer
    }
})

export default store