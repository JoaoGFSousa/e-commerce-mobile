import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { Provider } from "./src/Provider";
import { Router } from "./src/router/index";
import Toast from "react-native-toast-message";
export default function App() {
    return (
        <NavigationContainer>
            <Provider>
                <Router />
                <StatusBar barStyle="dark-content" />
            </Provider>
            <StatusBar barStyle="dark-content" />
            <Toast />
        </NavigationContainer>
    );
}