import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../pages/LoginScreen/Login-screen";
import { RegisterScreen } from "../pages/RegisterScreen/RegisterScreen";
import { TabRouter } from "./tab-router";
import { CartScreen } from "../pages/CartScreen/CartScreen";

const Stack = createNativeStackNavigator();
export const Router = () => {
  return (
    <Stack.Navigator
      initialRouteName="Initial"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Initial" component={TabRouter} />
      <Stack.Screen name="Cart" component={CartScreen} options={{
        headerShown: true,
        title: "Carrinho",
      }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{
        headerShown: true,
        title: "",
      }} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};