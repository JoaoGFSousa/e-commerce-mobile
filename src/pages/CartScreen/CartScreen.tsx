import { ProductCartItem } from "@/src/components/ProductCartItem/ProductCartItem"
import { useCart } from "@/src/contexts/CartContext"
import { View, Text, ActivityIndicator } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { styles } from "./style"
import { Button } from "@/src/components/Button/Button"
import Toast from "react-native-toast-message"
import { checkout, order } from "@/src/services/checkout.service"
import { openBrowserAsync } from "expo-web-browser"
import { useState } from "react"
import { theme } from "@/src/themes/root"

export const CartScreen = () => {
    const { cart, totalCart, clearCart } = useCart()
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckout = async () => {
        setIsLoading(true);
        try {
            const orderId = await order(cart);
            const url = await checkout(orderId);
            clearCart();
            Toast.show({
                type: "success",
                text1: "Compra finalizada",
                text2: "Aguardando a realização do pagamento",
            })
            await openBrowserAsync(url);
        } catch (error) {
            Toast.show({
                type: "error",
                text1: " Erro ao finalizar compra",
                text2: "Tente novamente mais tarde",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={cart}
                style={styles.cartList}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <ProductCartItem item={item} />}
            />
            {isLoading && (<ActivityIndicator size="large" color={theme.colors.blue[600]} />
            )}
            <View style={styles.footer}>
                <Text style={styles.totalPrice} >
                    {(totalCart / 100).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </Text>
                {!isLoading && (
                    <View style={styles.buttonContainer}>
                        <Button
                            text="Limpar Carrinho"
                            variant="secondary"
                            onPress={() => clearCart()}
                        />
                        <Button
                            text="Checkout" onPress={handleCheckout}
                        />
                    </View>
                )}
            </View>
        </View>
    )
}