import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ message: "O email é obrigatório" })
    .email({ message: "E-mail inválido" }),
  password: z
    .string({ message: "A senha é obrigatória" })
    .min(8, { message: "A Senha deve ter no minimo 8 caracteres." }),
});
