import { View, Text } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useAuth } from "@/src/contexts/AuthContext";
import { useEffect } from "react";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "./styles";

export const AccountScreen = ({ navigation }: NativeStackScreenProps<any>) => {
    const { isLogged, user, logout } = useAuth();

    if (!user || !isLogged) {
        return (
            <View style={styles.container}>
                <View style={styles.containerLogin}>
                    <Text style={styles.loginText} >Você ainda não está logado</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}
                        style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>Ir para o login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container} >
            <Text style={styles.title} >Minha Conta</Text>
            <View style={styles.profile} >
                <Text style={styles.profileItem} >Nome: {user.name}</Text>
                <Text style={styles.profileItem} >Email: {user.email}</Text>
            </View>
            <View style={styles.products} >
                <Text style={styles.productTitle}>
                    Ultimos Produtos
                </Text>
                <FlatList
                    data={user.products}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.productButton} >
                            <Text style={styles.productButtonName} >{item.name}</Text>
                            <Text style={styles.productButtonPrice} >{(item.price / 100).toLocaleString("pt-br", {
                                currency: "BRL",
                                style: "currency",
                            })}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <View style={styles.footer} >
                <TouchableOpacity style={styles.footerButton} onPress={() => {
                    logout();
                    navigation.navigate("Home");
                }}
                >
                    <Text style={styles.footerButtonText} >Sair</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
