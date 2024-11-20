import { api } from "./api";
import { ProductModel } from "./product.service";

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  nome: string;
  email: string;
  password: string;
  role?: string;
}

export interface UserModel {
  id: number;
  name: string;
  email: string;
  products: ProductModel[];
}

export interface SignInResponse {
  user: UserModel;
  access_token: string;
}

export interface SignUpResponse {
  id: number;
  name: string;
  email: string;
  roler: string[];
}

export const login = async (value: SignInRequest): Promise<SignInResponse> => {
  const response = await api.post("/auth/signin", value);
  return response.data;
};

export const register = async (
  value: SignUpRequest
): Promise<SignUpResponse> => {
  value.role = "COSTUMER";
  const response = await api.post("/auth/signup", value);
  return response.data;
};
