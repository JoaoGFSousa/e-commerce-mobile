import { ProductModel } from "@/src/services/product.service";
import { View, Text, Touchable } from "react-native";
import { styles } from "./style";
import { Image } from "expo-image";
import { blurhash } from "@/src/themes/root";
import { useCart } from "@/src/contexts/CartContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome6 } from "@expo/vector-icons";


export const ProductCartItem = ({
    item,
}: {
    item: ProductModel & { amount: number };
}) => {
    const { removeProduct, addQuantity, subQuantity } = useCart();
    return (
        <View style={styles.itemContainer}>
            <Image 
            style={styles.itemImage} 
            source={`${process.env.EXPO_PUBLIC_BASE_URL}/${item.picture}`}
                placeholder={{ blurhash }}
                contentFit="cover"
            />
            <View style={styles.itemDetails} >
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{(item.price / 100).toLocaleString("pt-Br", {
                    style: "currency",
                    currency: "BRL",
                })}
                </Text>
                <View style={styles.itemQuantityView} >
                    <Text>Dias: </Text>
                    <TouchableOpacity style={styles.itemQuantityButton} onPress={() => subQuantity(item.id)}>
                        <FontAwesome6
                            name="minus"
                            size={12}
                            style={styles.itemQuantityIcon}
                        />
                    </TouchableOpacity>
                    <Text style={styles.itemQuantity}>{item.amount}</Text>
                    <TouchableOpacity style={styles.itemQuantityButton} onPress={() => addQuantity(item.id)}>
                        <FontAwesome6
                            name="plus"
                            size={12}
                            style={styles.itemQuantityIcon}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.itemTotalPrice}>
                    Total:{" "}
                    {((item.price / 100) * item.amount).toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </Text>
            </View>
            <TouchableOpacity style={styles.itemRemoveButton}>
                <FontAwesome6
                    name="trash"
                    size={16}
                    styles={styles.itemRemoveButton}
                    onPress={() => removeProduct(item.id)}
                />
            </TouchableOpacity>
        </View>
    );
};