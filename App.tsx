/// <reference types="nativewind/types" />

import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import BasketScreen from "./screens/BasketScreen";

import HomeScreen from "./screens/HomeScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import { store } from "./store/store";

export type RootStackParamList = {
	Home: undefined;
	Restaurant: {
		id: number;
		imgUrl: any;
		title: string;
		rating: number;
		genre: string;
		address: string;
		short_description: string;
		dishes: string[];
		long: number;
		lat: number;
	};
	Basket: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator>
					{}
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen
						name="Restaurant"
						component={RestaurantScreen}
					/>
					<Stack.Screen
						name="Basket"
						component={BasketScreen}
						options={{ presentation: "modal", headerShown: false }}
					/>
					{}
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
