import { createSlice } from "@reduxjs/toolkit";



// Redux slice to handle the wish list
const wishSlice = createSlice({
  name: "wish",
  initialState: {
    wishItems: [], // Initial state is empty
  },
  reducers: {
    initializeWishItems: (state) => {
      if (typeof window !== "undefined") { // Ensure it's running on the client-side
        const wishItems = JSON.parse(localStorage.getItem("wishItems")) || [];
        state.wishItems = wishItems;
      }
    },

    addTowish: (state, action) => {
      const existingItem = state.wishItems.find((item) => item._id === action.payload._id);
      const quantityprice = action.payload.quantity * action.payload.price;

      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      } else {
        state.wishItems.push({ ...action.payload, quantityprice });
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("wishItems", JSON.stringify(state.wishItems)); // LocalStorage update
      }
    },

    removeTowish: (state, action) => {
      state.wishItems = state.wishItems.filter((item) => item._id !== action.payload._id);
      if (typeof window !== "undefined") {
        localStorage.setItem("wishItems", JSON.stringify(state.wishItems)); // LocalStorage update
      }
    },

    decreaseQuantity: (state, action) => {
      const existingItem = state.wishItems.find((item) => item._id === action.payload._id);

      if (existingItem.quantity === 1) {
        state.wishItems = state.wishItems.filter((item) => item._id !== action.payload._id);
      } else {
        existingItem.quantity = existingItem.quantity - 1;
        existingItem.quantityprice = existingItem.quantity * existingItem.price;
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("wishItems", JSON.stringify(state.wishItems)); // LocalStorage update
      }
    },

    increaseQuantity: (state, action) => {
      const existingItem = state.wishItems.find((item) => item._id === action.payload._id);

      existingItem.quantity = existingItem.quantity + 1;
      existingItem.quantityprice = existingItem.quantity * existingItem.price;

      if (typeof window !== "undefined") {
        localStorage.setItem("wishItems", JSON.stringify(state.wishItems)); // LocalStorage update
      }
    },

    getTotalItems: (state) => {
      return state.wishItems.reduce((total, item) => total + item.quantity, 0);
    },
  },
});

// Action to initialize wishItems from localStorage when component mounts
export const initializeWishItems = () => (dispatch) => {
  dispatch(wishSlice.actions.initializeWishItems());
};

export const { addTowish, removeTowish, decreaseQuantity, increaseQuantity, getTotalItems } = wishSlice.actions;
export default wishSlice.reducer;
