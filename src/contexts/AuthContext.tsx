import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { SignUpRequest, SignInRequest } from "../services/auth.service";
import { getItem, removeItem, setItem } from "../services/cache.service";
import { api } from "../services/api";

interface AuthContextData {
    isLogged: boolean;
    user: any,
    signIn: (value: SignInRequest) => void;
    singUp: (value: SignUpRequest) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);


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

    const signIn = (value: SignInRequest) => {
        setIsLogged(true);
    };

    const singUp = (value: SignUpRequest) => { };

    const logout = () => {
        setIsLogged(false);
        setUser(null);
        setToken(null);
        removeItem("user");
        removeItem("token");
    }

    return (
        <AuthContext.Provider value={{ isLogged, signIn, singUp, user, logout }}>
            {children}
        </AuthContext.Provider>
    );
};