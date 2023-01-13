import { View, Text, TouchableOpacity, Image } from "react-native";
import Currency from "react-currency-formatter";
import { urlFor } from "../sanity";
import { useState } from "react";
import {
	MinusCircleIcon,
	PlusCircleIcon,
} from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import {
	addToBasket,
	removeToBasket,
	selectBasketItems,
	selectBasketItemsWithId,
} from "../store/basketSlice";

interface Props {
	id: string;
	name: string;
	description: string;
	price: number;
	image: any;
}

const DishRow: React.FC<Props> = ({ id, name, description, price, image }) => {
	const [isPressed, setIsPressed] = useState(false);

	const dispatch = useDispatch();
	const items = useSelector(state => selectBasketItemsWithId(state, id));

	const addItemToBasket = () => {
		dispatch(addToBasket({ id, name, description, price, image }));
	};

	const removeItemsFromBasket = () => {
		if (!(items.length > 0)) return;

		dispatch(removeToBasket({ id }));
	};

	return (
		<>
			<TouchableOpacity
				className={`bg-white border p-4 border-gray-200 ${
					isPressed && "border-b-0"
				}`}
				onPress={() => setIsPressed(!isPressed)}
			>
				<View className="flex-row ">
					<View className="flex-1 pr-2">
						<Text className="text-lg mb-1">{name}</Text>
						<Text className="text-gray-400">{description}</Text>
						<Text className="text-gray-400 mt-2">
							<Currency quantity={price} currency={"GBP"} />
						</Text>
					</View>

					<View>
						<Image
							source={{
								uri: urlFor(image).url(),
							}}
							className="h-20 w-20 bg-gray-300 p-4"
							style={{
								borderWidth: 1,
								borderColor: "#f3f3f4",
							}}
						/>
					</View>
				</View>
			</TouchableOpacity>

			{isPressed && (
				<View className="bg-white px-4">
					<View className="flex-row items-center space-x-2 pb-3">
						<TouchableOpacity
							onPress={removeItemsFromBasket}
							disabled={items.length === 0}
						>
							<MinusCircleIcon
								size={40}
								color={items.length > 0 ? "#00CCBB" : "gray"}
							/>
						</TouchableOpacity>

						<Text>{items.length}</Text>

						<TouchableOpacity onPress={addItemToBasket}>
							<PlusCircleIcon size={40} color={"#00CCBB"} />
						</TouchableOpacity>
					</View>
				</View>
			)}
		</>
	);
};

export default DishRow;
