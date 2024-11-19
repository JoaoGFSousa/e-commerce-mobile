import { View, Text } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useAuth } from "@/src/contexts/AuthContext";
import { useEffect } from "react";

export const AccountScreen = ({ navigation }: NativeStackScreenProps<any>) => {
    const { isLogged } = useAuth();

    useEffect(() => {
        if (!isLogged) {
            navigation.navigate("Login");
        }
    }, []);

    return (
        <View>
            <Text>Account Screen</Text>
        </View>
    );
};
