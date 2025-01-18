import { createSlice } from "@reduxjs/toolkit";

const wishSlice =  createSlice(
    {
        name:"wish",
        initialState:{
            wishItems:[]
        },
        reducers:{
            addTowish: (state, action) => {
                const existingItem = state.wishItems.find((item) => item._id === action.payload._id);
                const quantityprice = action.payload.quantity * action.payload.price
                console.log(quantityprice);
                
                if (existingItem) {
                  existingItem.quantity = action.payload.quantity;
                  console.log("already");
                  
                } else {
                  state.wishItems.push({ ...action.payload,quantityprice });
                }},
            removeTowish:(state,action)=>{
                state.wishItems = state.wishItems.filter((item)=>item._id !== action.payload._id)

            },
            decreaseQuantity:(state,action)=>{
                const existingItem = state.wishItems.find((item) => item._id === action.payload._id);
                
                if(existingItem.quantity == 1){
                    state.wishItems = state.wishItems.filter((item)=>item._id !== action.payload._id)
                }
                else{
                    existingItem.quantity = existingItem.quantity - 1
                    existingItem.quantityprice = existingItem.quantity * existingItem.price

                }

            },
            increaseQuantity:(state,action)=>{
                const existingItem = state.wishItems.find((item) => item._id === action.payload._id);
                
               
               
                    existingItem.quantity = existingItem.quantity + 1
                    existingItem.quantityprice = existingItem.quantity * existingItem.price

                
            },
            

            getTotalItems: (state) => {
                return state.wishItems.reduce((total, item) => total + item.quantity, 0);
              }
              
              
                }
            
            
            }
)

export const { addTowish, removeTowish,getTotalItems } = wishSlice.actions;
export default wishSlice.reducer;