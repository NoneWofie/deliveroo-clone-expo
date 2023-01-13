import { View, Text, TouchableOpacity, Image } from "react-native";
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

interface Props {
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
}

type NavigatorProps = NativeStackNavigationProp<
	RootStackParamList,
	"Restaurant"
>;

const RestaurantCard: React.FC<Props> = ({
	address,
	dishes,
	genre,
	id,
	imgUrl,
	lat,
	long,
	rating,
	short_description,
	title,
}) => {
	const navigation = useNavigation<NavigatorProps>();

	return (
		<TouchableOpacity
			className="bg-white mr-3 shadow"
			onPress={() =>
				navigation.navigate("Restaurant", {
					address,
					dishes,
					genre,
					id,
					imgUrl,
					lat,
					long,
					rating,
					short_description,
					title,
				})
			}
		>
			<Image
				source={{
					uri: urlFor(imgUrl).url(),
				}}
				className="h-36 w-64 rounded-sm"
			/>

			<View className="px-3 pb-4">
				<Text className="font-bold text-lg pt-2">{title}</Text>

				<View className="flex-row items-center space-x-1">
					<StarIcon color={"green"} opacity={0.5} size={22} />
					<Text className="text-sm text-gray-500">
						<Text className="text-green-500">{rating}</Text> ·{" "}
						{genre}
					</Text>
				</View>

				<View className="flex-row items-center space-x-1">
					<MapPinIcon color="gray" opacity={0.4} size={22} />
					<Text className="text-xm text-gray-500">
						Nearby · {address}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default RestaurantCard;
