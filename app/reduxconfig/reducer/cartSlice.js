import { createSlice } from "@reduxjs/toolkit";

const cartSlice =  createSlice(
    {
        name:"cart",
        initialState:{
            cartItems:[]
        },
        reducers:{
            addToCart: (state, action) => {
                const existingItem = state.cartItems.find((item) => item.id === action.payload.id);
                if (existingItem) {
                  existingItem.quantity = action.payload.quantity;
                  console.log("already");
                  
                } else {
                  state.cartItems.push({ ...action.payload });
                }},
            removeToCart:(state,action)=>{
                state.cartItems = state.cartItems.filter((item)=>item.id !== action.payload.id)

            },
            getTotalItems: (state) => {
                return state.cartItems.reduce((total, item) => total + item.quantity, 0);
              }
              
              
                }
            
            
            }
)

export const { addToCart, removeToCart,getTotalItems } = cartSlice.actions;
export default cartSlice.reducer;