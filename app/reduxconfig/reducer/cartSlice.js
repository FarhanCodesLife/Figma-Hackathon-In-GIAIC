import { createSlice } from "@reduxjs/toolkit";

const cartSlice =  createSlice(
    {
        name:"cart",
        initialState:{
            cartItems:[]
        },
        reducers:{
            addToCart: (state, action) => {
                const existingItem = state.cartItems.find((item) => item._id === action.payload._id);
                const quantityprice = action.payload.quantity * action.payload.price
                console.log(quantityprice);
                
                if (existingItem) {
                  existingItem.quantity = action.payload.quantity;
                  console.log("already");
                  
                } else {
                  state.cartItems.push({ ...action.payload,quantityprice });
                }},
            removeToCart:(state,action)=>{
                state.cartItems = state.cartItems.filter((item)=>item._id !== action.payload._id)

            },
            decreaseQuantity:(state,action)=>{
                const existingItem = state.cartItems.find((item) => item._id === action.payload._id);
                
                if(existingItem.quantity == 1){
                    state.cartItems = state.cartItems.filter((item)=>item._id !== action.payload._id)
                }
                else{
                    existingItem.quantity = existingItem.quantity - 1
                    existingItem.quantityprice = existingItem.quantity * existingItem.price

                }

            },
            increaseQuantity:(state,action)=>{
                const existingItem = state.cartItems.find((item) => item._id === action.payload._id);
                
                if(existingItem.quantity > 10){
                    console.log("inventry end");
                    
                }
                else{
                    existingItem.quantity = existingItem.quantity + 1
                    existingItem.quantityprice = existingItem.quantity * existingItem.price

                }
            },
            

            getTotalItems: (state) => {
                return state.cartItems.reduce((total, item) => total + item.quantity, 0);
              }
              
              
                }
            
            
            }
)

export const { addToCart, removeToCart,getTotalItems,increaseQuantity,decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;