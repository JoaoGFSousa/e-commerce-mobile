import { ReactNode } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
export const Provider = ({ children }: { children: ReactNode }) => {
    return <SafeAreaProvider>
        <CartProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </CartProvider>
    </SafeAreaProvider>
};