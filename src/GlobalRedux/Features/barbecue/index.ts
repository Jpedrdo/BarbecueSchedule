"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cardListData } from "@/data";
import { CardData, Barbecue } from "@/interfaces";

const storedCardList =
  typeof window !== "undefined" && localStorage.getItem("cardList");

const initialState: Barbecue = {
  cardList: [
    ...((storedCardList ? JSON.parse(storedCardList) : cardListData) ?? "[]"),
  ],
};

const barbecueSlice = createSlice({
  name: "barbecue",
  initialState,
  reducers: {
    addListData: (state, action: PayloadAction<CardData>) => {
      state.cardList.push(action.payload);
      localStorage.setItem("cardList", JSON.stringify(state.cardList));
    },
    editListData: (state, action: PayloadAction<CardData>) => {
      const index = state.cardList.findIndex(
        (cardData) => cardData.id === action.payload.id
      );
      if (index !== -1) {
        state.cardList[index] = action.payload;
        localStorage.setItem("cardList", JSON.stringify(state.cardList));
      }
    },
    deleteListData: (state, action: PayloadAction<number>) => {
      state.cardList = state.cardList.filter(
        (cardData) => cardData.id !== action.payload
      );
      localStorage.setItem("cardList", JSON.stringify(state.cardList));
    },
  },
});

export const { addListData, editListData, deleteListData } =
  barbecueSlice.actions;

export default barbecueSlice.reducer;
