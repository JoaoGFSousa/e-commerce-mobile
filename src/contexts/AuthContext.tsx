import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { SignUpRequest, SignInRequest, UserModel, login, register } from "../services/auth.service";
import { getItem, removeItem, setItem } from "../services/cache.service";
import { api } from "../services/api";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";


interface AuthContextData {
    isLogged: boolean;
    user: UserModel | null,
    signIn: (value: SignInRequest) => Promise<void>;
    signUp: (value: SignUpRequest) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState<UserModel | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const navigator = useNavigation();


    useEffect(() => {
        (async () => {
            const [cacheLogged] = await Promise.all([
                getItem("user"),
                getItem("token"),
            ]);
            setUser(user);
            setToken(token);
        })();
    }, []);

    useEffect(() => {
        if (token !== null) {
            setIsLogged(true);
            setItem("token", token);
            api.defaults.headers["Authorization"] = `Bearer ${token}`;
            return;
        }
    }, [token]);

    useEffect(() => {
        if (user !== null) {
            setUser(user);
            setItem("user", user);
            return;
        }
    }, [user]);

    const signIn = async (value: SignInRequest) => {
        try {
            const { access_token, user } = await login(value);
            setToken(access_token);
            setUser(user)
            navigator.navigate("Home" as never);
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Erro ao fazer login",
                text2: "Verifique suas credenciais e tente novamente",
            });
        }
    };

    const signUp = async (value: SignUpRequest) => {
        try {
            const { id } = await register(value);
            Toast.show({
                type: "success",
                text1: "Cadastro realizado com sucesso",
                text2: "Faça login para continuar",
            });
            navigator.navigate("Login" as never);
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Erro ao fazer cadastro",
                text2: "Verifique seus dados e tente novamente",
            });
        }
    };

    const logout = () => {
        setIsLogged(false);
        setUser(null);
        setToken(null);
        removeItem("user");
        removeItem("token");
    }

    return (
        <AuthContext.Provider value={{ isLogged, signIn, signUp, user, logout }}>
            {children}
        </AuthContext.Provider>
    );
};