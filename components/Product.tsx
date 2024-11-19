/* eslint-disable no-unused-vars */
import React from "react";
import { BorderBeamDemo } from "./ProductCard";

type Props = {};

const Product = (props: Props) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Products & Services</h1>
      <BorderBeamDemo />
    </div>
  );
};

export default Product;
