import { api } from "./api";

export interface ProductModel {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  picture?: string;
  score?: number;
}

export const getProducts = async(): Promise<ProductModel[]>=> {
  const response = await api.get("/products");
  return response.data;
};