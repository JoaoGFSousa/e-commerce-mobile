import { Input } from "@/src/components/Input/Input";
import { View, Text, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { styles } from "./styles"
import { Button } from "@/src/components/Button/Button";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { Form } from "@/src/components/Form";
import { useForm } from "react-hook-form";
import { loginSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/src/contexts/AuthContext";

export const LoginScreen = ({ navigation }: NativeStackScreenProps<any>) => {
    const { register, setValue, formState: { errors }, handleSubmit } = useForm({ resolver: zodResolver(loginSchema) });
    const { signIn } = useAuth();
    const onSubmit = (data: any) => { signIn(data)
         
         };

    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.containerBox} >
                <Text style={styles.title}>Faça Login</Text>
                <View style={styles.containerForm} >
                    <Form errors={errors}
                        register={register}
                        setValue={setValue}
                        style={styles.containerForm}
                    >
                        <Input label="E-mail" id="email" />
                        <Input label="Senha" id="password" secureTextEntry={true} />
                    </Form>
                    <View style={styles.buttonContainer} >
                        <Button text="Login" onPress={() => {
                            handleSubmit(onSubmit)();
                        }} />
                        <View style={styles.registerTextContainer} >
                            <Text style={styles.registerText} >Ainda não possui uma conta</Text>
                            <Button
                                text="Cadastre-se"
                                onPress={() => {
                                    navigation.navigate("Register")
                                }} variant="link" />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView >
    );
};