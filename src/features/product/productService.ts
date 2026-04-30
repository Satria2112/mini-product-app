import { api } from "../../services/axios";

export const getProducts = (params: {
  q?: string;
  limit?: number;
  skip?: number;
}) => {
  const { q = "", limit = 5, skip = 0 } = params;

  if (q) {
    return api.get(`/products/search?q=${q}&limit=${limit}&skip=${skip}`);
  }

  return api.get(`/products?limit=${limit}&skip=${skip}`);
};

export const getProductDetail = (id: number) => {
  return api.get(`/products/${id}`);
};

export const addProduct = (data: any) => {
  return api.post("/products/add", data);
};

export const updateProduct = (id: number, data: any) => {
  return api.put(`/products/${id}`, data);
};

export const deleteProduct = (id: number) => {
  return api.delete(`/products/${id}`);
};