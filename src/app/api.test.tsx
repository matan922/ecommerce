import { deleteProduct, postNewProduct, updateProduct } from "./api"
import { CreateProductRequest, UpdateProductRequest } from "../features/product/productTypes"
import axios from "axios"

// post new product should post a new product to a fake api
// it should return passed if the right data was passed through it to the back end
let createdProduct: number = 0

test("postNewProduct test", async () => {
    const { data } = await axios.get<{ id: number }[]>(
        "https://api.escuelajs.co/api/v1/categories"
    );

    if (data.length === 0) {
        throw new Error("Got 0 categories.")
    };

    const prodExamp: CreateProductRequest = {
        title: "Harry Potter",
        price: 100,
        description: "Wizard",
        categoryId: data[0].id,
        images: ["https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"],
    };

    const newProd = await postNewProduct(prodExamp)
    createdProduct = newProd.id
    expect(newProd.title).toEqual(prodExamp.title)
})


test("updateProduct test", async () => {
    const { data } = await axios.get<{ id: number }[]>(
        "https://api.escuelajs.co/api/v1/products" 
    );

    if (data.length === 0) {
        throw new Error("Got 0 products.")
    };


    const prodExamp: UpdateProductRequest = {
        id: data[0].id,
        title: "Table",
        price: 40
    };

    const updatedProd = await updateProduct(prodExamp)
    expect(updatedProd.title).toEqual(prodExamp.title)
})


test("deleteProduct test", async () => {
    const prodExamp: number = createdProduct

    const deletedProd = await deleteProduct(prodExamp)
    expect(deletedProd).toEqual(true)
})