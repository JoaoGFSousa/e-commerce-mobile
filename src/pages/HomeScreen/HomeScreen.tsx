import { ProductCard } from "@/src/components/ProductCards/ProductCards";
import { FlatList, View } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";



export const HomeScreen = ({ }: NativeStackScreenProps<any>) => {
    const products = [
        {
            id: 1,
            name: "Produto 01 muito legal",
            description: "Produto 01 muito legal com diversas utilidade e aplicações domésticas",
            price: 1250,
            categoryId: 2,
            picture: "",
            score: 4.5,
        },
        {
            id: 2,
            name: "Produto 02 legal",
            description: "Produto 02 só é legal com algumas utilidades e aplicações domésticas",
            price: 1050,
            categoryId: 2,
            picture: "",
            score: 3.2,
        },
    ];
    return (
        <View>
            <FlatList
                style={{ padding: 8 }}
                contentContainerStyle={{ gap: 6 }}
                data={products}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <ProductCard product={item} />}
            />
        </View>
    )
};