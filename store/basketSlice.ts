import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface CounterState {
	items: { id: string }[];
}

const initialState: CounterState = {
	items: [],
};

export const basketSlice = createSlice({
	name: "basket",
	initialState,
	reducers: {
		addToBasket: (state, action) => {
			state.items = [...state.items, action.payload];
		},
		removeToBasket: (state, action) => {
			const index = state.items.findIndex(
				item => item.id === action.payload.id
			);

			let newBasket = [...state.items];

			if (index >= 0) {
				newBasket.splice(index, 1);
			} else {
				console.warn(
					"Cant remove product",
					action.payload.id,
					"as its not in basket"
				);
			}

			state.items = newBasket;
		},
	},
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeToBasket } = basketSlice.actions;

export const selectBasketItems = (state: RootState) => state.basket.items;

export const selectBasketItemsWithId = (
	state: { basket: CounterState },
	id: string
) => state.basket.items.filter(item => item.id === id);

export default basketSlice.reducer;
