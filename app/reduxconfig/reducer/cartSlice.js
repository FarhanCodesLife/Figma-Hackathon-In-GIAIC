import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [], // LocalStorage se data load
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find((item) => item._id === action.payload._id);
      const quantityprice = action.payload.quantity * action.payload.price;

      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      } else {
        state.cartItems.push({ ...action.payload, quantityprice });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // LocalStorage mein update karo
    },

    removeToCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item._id !== action.payload._id);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // LocalStorage mein update karo
    },

    decreaseQuantity: (state, action) => {
      const existingItem = state.cartItems.find((item) => item._id === action.payload._id);

      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item._id !== action.payload._id);
      } else {
        existingItem.quantity = existingItem.quantity - 1;
        existingItem.quantityprice = existingItem.quantity * existingItem.price;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // LocalStorage mein update karo
    },

    increaseQuantity: (state, action) => {
      const existingItem = state.cartItems.find((item) => item._id === action.payload._id);

      if (existingItem.quantity > 10) {
        console.log("Inventory end");
      } else {
        existingItem.quantity = existingItem.quantity + 1;
        existingItem.quantityprice = existingItem.quantity * existingItem.price;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // LocalStorage mein update karo
    },

    getTotalItems: (state) => {
      return state.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
  },
});

export const { addToCart, removeToCart, getTotalItems, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
