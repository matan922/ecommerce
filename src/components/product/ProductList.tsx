import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { receivedProducts } from "../../features/product/productSlice";
import { getProducts } from "../../app/api";
import ProductDetailCard from "./ProductDetailCard";
import "./ProductList.scss";

import { Pagination } from "@mui/material";

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getProducts().then((products) => {
      dispatch(receivedProducts(products));
    });
  }, [dispatch]);

  const products = useAppSelector((state) => state.product.products);

  const productsPerPage = 12;
  const totalProducts = Object.values(products).length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const displayedProducts = Object.values(products).slice(startIndex, endIndex);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="product-list">
        {displayedProducts.map((product) => (
          <ProductDetailCard key={product.id} product={product} />
        ))}
      </div>

      <div className="pagination">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          color="primary"
          className="pagination-cls"
        />
      </div>
    </>
  );
};

export default ProductList;
