interface Category{
    id:number,
    name:string,
    image:string,
    creationAt:string,
    updatedAt:string
}

export interface Product{
    id: string;
    title: string;
    price: number;
    description: string;
    images: string;
    imageURL: string;
    imageAlt: string;
    imageCredit: string;
    category:Category
}

export interface CreateProductRequest{
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images: string[];
  }

export interface UpdateProductRequest {
    id: number;
    title: string;
    price: number;
}

export interface ProductResponse {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    category: Category;
    creationAt: string;
    updatedAt: string;
}