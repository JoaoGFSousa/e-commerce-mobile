import { ProductCard } from "@/src/components/ProductCards/ProductCards";
import { getProducts, ProductModel } from "@/src/services/product.service";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";



export const HomeScreen = ({ }: NativeStackScreenProps<any>) => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProdutcs] = useState<ProductModel[]>([]);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const products = await getProducts();
            setProdutcs(products);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <View>
            {isLoading && <ActivityIndicator size="large" />}
            {!isLoading && (
                <FlatList
                    style={{ padding: 8 }}
                    contentContainerStyle={{ gap: 6 }}
                    data={products}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => <ProductCard product={item} />}
                />
            )}
        </View>
    )
};