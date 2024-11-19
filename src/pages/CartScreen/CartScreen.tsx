import { ProductCartItem } from "@/src/components/ProductCartItem/ProductCartItem"
import { useCart } from "@/src/contexts/CartContext"
import { View, Text } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { styles } from "./style"
import { Button } from "@/src/components/Button/Button"

export const CartScreen = () => {
    const { cart, totalCart, clearCart } = useCart()
    return (
        <View style={styles.container}>
            <FlatList
                data={cart}
                style={styles.cartList}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <ProductCartItem item={item} />}
            />
            <View style={styles.footer}>
                <Text style={styles.totalPrice} >
                    {(totalCart / 100).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </Text>
                <View style={styles.buttonContainer}>
                    <Button
                        text="Limpar Carrinho"
                        variant="secondary"
                        onPress={() => clearCart()}
                    />
                    <Button
                        text="Checkout" onPress={() => { }}
                    />
                </View>
            </View>
        </View>
    )
}