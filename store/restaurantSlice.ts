import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface CounterState {
	restaurant: {
		id: number | null;
		imgUrl: any | null;
		title: string | null;
		rating: number | null;
		genre: string | null;
		address: string | null;
		short_description: string | null;
		dishes: string[] | null;
		long: number | null;
		lat: number | null;
	}[];
}

const initialState: any = {
	restaurant: {
		id: null,
		imgUrl: null,
		title: null,
		rating: null,
		genre: null,
		address: null,
		short_description: null,
		dishes: null,
		long: null,
		lat: null,
	},
};

export const restaurantSlice = createSlice({
	name: "restaurant",
	initialState,
	reducers: {
		setRestaurant: (state, action) => {
			state.restaurant = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setRestaurant } = restaurantSlice.actions;

export const selectRestaurant = (state: any) => {
	return state.restaurant.restaurant;
};

export default restaurantSlice.reducer;
