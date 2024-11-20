import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { Image } from "expo-image";
import { FontAwesome6 } from "@expo/vector-icons";
import { ProductModel } from "@/src/services/product.service";
import { useCart } from "@/src/contexts/CartContext";
import { blurhash } from "@/src/themes/root";

interface ProductCardProps {
    product: ProductModel;
}
export const ProductCard: FC<ProductCardProps> = ({ product }) => {
    const { addProduct } = useCart();

    return (
        <View style={styles.productCardContainer} >
            <View style={styles.productContainer} >
                <Image style={styles.productImage} source={`${process.env.EXPO_PUBLIC_BASE_URL}/${product.picture}`} contentFit="cover"
                    placeholder={{ blurhash }} transition={1000} />
                <View style={styles.productDetails} >
                    <Text style={styles.productName} >{product.name}</Text>
                    <Text style={styles.productDescription} >{product.description}</Text>
                    <Text style={styles.productPrice} >{(product.price / 100).toLocaleString("pt-br", {
                        currency: "BRL",
                        style: "currency",
                    })}
                    </Text>
                </View>
            </View>
            <TouchableOpacity style={styles.productButton} onPress={() => addProduct(product)} >
                <View style={styles.productButtonContainer} >
                    <FontAwesome6 style={styles.productButtonIcon} name="cart-plus" size={16} color="white" />
                    <Text style={styles.productButtonText} >Adicionar ao carrinho</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};  