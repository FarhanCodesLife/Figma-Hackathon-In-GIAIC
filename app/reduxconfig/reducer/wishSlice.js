import { createSlice } from "@reduxjs/toolkit";

const wishSlice = createSlice({
  name: "wish",
  initialState: {
    wishItems: JSON.parse(localStorage.getItem("wishItems")) || [], // LocalStorage se data load
  },
  reducers: {
    addTowish: (state, action) => {
      const existingItem = state.wishItems.find((item) => item._id === action.payload._id);
      const quantityprice = action.payload.quantity * action.payload.price;

      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      } else {
        state.wishItems.push({ ...action.payload, quantityprice });
      }
      localStorage.setItem("wishItems", JSON.stringify(state.wishItems)); // LocalStorage mein update karo
    },

    removeTowish: (state, action) => {
      state.wishItems = state.wishItems.filter((item) => item._id !== action.payload._id);
      localStorage.setItem("wishItems", JSON.stringify(state.wishItems)); // LocalStorage mein update karo
    },

    decreaseQuantity: (state, action) => {
      const existingItem = state.wishItems.find((item) => item._id === action.payload._id);

      if (existingItem.quantity === 1) {
        state.wishItems = state.wishItems.filter((item) => item._id !== action.payload._id);
      } else {
        existingItem.quantity = existingItem.quantity - 1;
        existingItem.quantityprice = existingItem.quantity * existingItem.price;
      }
      localStorage.setItem("wishItems", JSON.stringify(state.wishItems)); // LocalStorage mein update karo
    },

    increaseQuantity: (state, action) => {
      const existingItem = state.wishItems.find((item) => item._id === action.payload._id);

      existingItem.quantity = existingItem.quantity + 1;
      existingItem.quantityprice = existingItem.quantity * existingItem.price;

      localStorage.setItem("wishItems", JSON.stringify(state.wishItems)); // LocalStorage mein update karo
    },

    getTotalItems: (state) => {
      return state.wishItems.reduce((total, item) => total + item.quantity, 0);
    },
  },
});

export const { addTowish, removeTowish, decreaseQuantity, increaseQuantity, getTotalItems } = wishSlice.actions;
export default wishSlice.reducer;
