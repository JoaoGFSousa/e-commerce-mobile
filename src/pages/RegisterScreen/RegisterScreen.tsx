import { Button } from "@/src/components/Button/Button";
import { Input } from "@/src/components/Input/Input";
import { SafeAreaView, View, Text } from "react-native";
import { styles } from "./style";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { Form } from "@/src/components/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./schema";
import { useAuth } from "@/src/contexts/AuthContext";

export const RegisterScreen = ({ navigation }: NativeStackScreenProps<any>) => {
    const { register, setValue, formState: { errors }, handleSubmit } = useForm({
        mode: "all", resolver: zodResolver(registerSchema),
    });
    const { signUp } = useAuth();
    const onSubmit = (data: any) => {
        signUp(data);
    }
    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.containerBox} >
                <Text style={styles.title}>Faça Seu Cadastro</Text>
                <View style={styles.containerForm} >
                    <Form errors={errors} register={register} setValue={setValue} style={styles.containerForm}>
                        <Input label="Nome" id="name" isRequired />
                        <Input label="E-mail" id="email" isRequired />
                        <Input label="Senha" id="password" secureTextEntry isRequired />
                        <Input label="Confirme sua senha"
                            id="password_confirmation"
                            secureTextEntry
                            isRequired />
                    </Form>
                    <View style={styles.buttonContainer} >
                        <Button text="Cadastrar" onPress={() => {
                            handleSubmit(onSubmit)();
                        }} />
                        <View style={styles.loginTextContainer} >
                            <Text style={styles.loginText} >Já possui um conta?</Text>
                            <Button
                                text="Faça seu Login"
                                onPress={() => {
                                    navigation.navigate("Login")
                                }} variant="link" />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};