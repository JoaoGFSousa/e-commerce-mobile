import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { Provider } from "./src/Provider";
import { Router } from "./src/router/index";
export default function App() {
    return (
        <NavigationContainer>
            <Provider>
            <Router />
            <StatusBar barStyle="dark-content" />
            </Provider>
        </NavigationContainer>
    )
}