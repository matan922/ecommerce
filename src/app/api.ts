import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CreateProductRequest, ProductResponse, Product, UpdateProductRequest } from "../features/product/productTypes"; //changed

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await axios.get<Product[]>(
      "https://api.escuelajs.co/api/v1/products"
    );
    return response.data;

  } catch (error) {
    throw new Error("Failed to fetch products: ");
  }
}

export async function postNewProduct(productData: CreateProductRequest): Promise<ProductResponse> {
  try {
    const { data } = await axios.post<ProductResponse>(
      "https://api.escuelajs.co/api/v1/products/", productData
    );
    return data

  } catch (error) {
    throw new Error("Failed to add new product.")
  }
}

export async function updateProduct({ id, title, price }: UpdateProductRequest): Promise<ProductResponse> {
  try {
    const { data } = await axios.put<ProductResponse>(
      `https://api.escuelajs.co/api/v1/products/${id}`, { title, price }
    );
    return data

  } catch (error) {
    throw new Error("Failed to update the product.")
  }
}

export async function deleteProduct(id: number,): Promise<boolean> {
  try {
    const { data } = await axios.delete<boolean>(
      `https://api.escuelajs.co/api/v1/products/${id}`
    );
    return data

  } catch (error: any) {
    throw new Error("Failed to delete a product.")
  }
}


export type CartItems = { [productID: string]: number };
export type CheckoutResponse = { success: boolean; error?: string };

export async function checkout(items: CartItems): Promise<CheckoutResponse> {
  const modifier = Object.keys(items).length > 0 ? "success" : "error";
  const url = `/checkout-${modifier}.json`;
  await sleep(500);
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(items),
  });
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error);
  }
  return data as CheckoutResponse;
}

const sleep = (time: number) => new Promise((res) => setTimeout(res, time));
