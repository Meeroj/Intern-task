// import { createSlice } from "@reduxjs/toolkit";
// cartSlice.js

import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Savdo kartidagi mahsulotlar ro'yxati
    favourites:[]
  },
  reducers: {
    addCartItem: (state, action) => {
      const newItem = action.payload; // Qo'shish kerak bo'lgan mahsulot
      const existingItem = state.items.find(item => item.id === newItem.id); // Agar mahsulot ro'yxatda mavjud bo'lsa

      if (existingItem) {
        // Agar mahsulot ro'yxatda mavjud bo'lsa, miqdorini oshiramiz
        existingItem.quantity++;
      } else {
        // Agar mahsulot ro'yxatda mavjud bo'lmagan bo'lsa, mahsulotni qo'shamiz
        state.items.push({ ...newItem, quantity: 1 });
      }
    },
    removeCartItem: (state, action) => {
        const idToRemove = action.payload;
        const existingItem = state.items.find(item => item.id === idToRemove);
        if (existingItem) {
          // Mahsulot ro'yxatda mavjud bo'lsa, miqdorini kamaytiramiz
          existingItem.quantity--;
          // Agar mahsulot miqdori 0 ga teng bo'lsa, uni o'chiramiz
          if (existingItem.quantity === 0) {
            state.items = state.items.filter(item => item.id !== idToRemove);
          }
        }
    },
    deleteCartItem:(state,action)=>{
      const idToRemove = action.payload;

      state.items = state.items.filter(item => item.id !== idToRemove);
      
    },
    
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
    addFavourites:(state,action)=>{
      const newItem = action.payload; // Qo'shish kerak bo'lgan mahsulot
        state.favourites?.push(newItem);

    },
    deleteFavourites:(state,action)=>{
      const idToRemove = action.payload;

      state.favourites = state.favourites.filter(item => item.id !== idToRemove);
      
    },
  },
});

export const { addCartItem, removeCartItem, updateCartItemQuantity, deleteCartItem, addFavourites, deleteFavourites } = cartSlice.actions;

export default cartSlice.reducer;
