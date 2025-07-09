import React from "react";
import CreateProductPage from "./CreateQuotation";
import CreateProduct from "./CreateProduct";
import CountProduct from "./CountProduct";

const ProductPage = () => {
  return (
    <>
      <CreateProduct />
      <CountProduct />
      <CreateProductPage />
    </>
  );
};

export default ProductPage;
