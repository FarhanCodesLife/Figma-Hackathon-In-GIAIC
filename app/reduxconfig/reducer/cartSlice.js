import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    initializeCart: (state) => {
      if (typeof window !== "undefined") { // Ensure we're on the client-side
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        state.cartItems = cartItems;
      }
    },

    addToCart: (state, action) => {
      const existingItem = state.cartItems.find((item) => item._id === action.payload._id);
      const quantityprice = action.payload.quantity * action.payload.price;

      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      } else {
        state.cartItems.push({ ...action.payload, quantityprice });
      }

      if (typeof window !== "undefined") { // Ensure we're on the client-side
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // Update localStorage
      }
    },

    removeToCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item._id !== action.payload._id);

      if (typeof window !== "undefined") { // Ensure we're on the client-side
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // Update localStorage
      }
    },

    decreaseQuantity: (state, action) => {
      const existingItem = state.cartItems.find((item) => item._id === action.payload._id);

      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item._id !== action.payload._id);
      } else {
        existingItem.quantity = existingItem.quantity - 1;
        existingItem.quantityprice = existingItem.quantity * existingItem.price;
      }

      if (typeof window !== "undefined") { // Ensure we're on the client-side
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // Update localStorage
      }
    },

    increaseQuantity: (state, action) => {
      const existingItem = state.cartItems.find((item) => item._id === action.payload._id);

      if (existingItem.quantity > 10) {
        console.log("Inventory end");
      } else {
        existingItem.quantity = existingItem.quantity + 1;
        existingItem.quantityprice = existingItem.quantity * existingItem.price;
      }

      if (typeof window !== "undefined") { // Ensure we're on the client-side
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // Update localStorage
      }
    },
  },
});

// Selector to get total items
export const getTotalItems = (state) => {
  return state.cart.cartItems.reduce((total, item) => total + item.quantity, 0);
};

export const { addToCart, removeToCart, initializeCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
