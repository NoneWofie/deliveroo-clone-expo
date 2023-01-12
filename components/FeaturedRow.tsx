import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";

import sanityClient from "../sanity";

interface Props {
	id: string;
	title: string;
	description: string;
}

const FeaturedRow: React.FC<Props> = ({ id, title, description }) => {
	const [restaurants, setRestaurants] = useState([]);

	useEffect(() => {
		sanityClient
			.fetch(
				`
		*[_type == "featured" && _id == $id] {
  			...,
  			restaurants[]->{
    			...,
    			dishes[]->,
    			type->{
      				name
    			}
  			}
		}[0]
`,
				{ id }
			)
			.then(data => setRestaurants(data?.restaurants));
	}, []);

	return (
		<View>
			<View className="mt-4 flex-row items-center justify-between px-4">
				<Text className="font-bold text-xl">{title}</Text>
				<ArrowRightIcon color={"#00CCDD"} />
			</View>

			<Text className="text-sm text-gray-500 px-4">{description}</Text>

			<ScrollView
				horizontal
				contentContainerStyle={{ paddingHorizontal: 15 }}
				showsHorizontalScrollIndicator={false}
				className="pt-4"
			>
				{/* RestaurantCards... */}
				{restaurants?.map((restaurant: any) => (
					<RestaurantCard
						id={restaurant._id}
						key={restaurant._id}
						imgUrl={restaurant.image}
						title={restaurant.name}
						rating={restaurant.rating}
						genre={restaurant.type?.name}
						address={restaurant.address}
						short_description={restaurant.short_description}
						dishes={restaurant.dishes}
						long={restaurant.long}
						lat={restaurant.lat}
					/>
				))}
			</ScrollView>
		</View>
	);
};

export default FeaturedRow;
