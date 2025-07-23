"use client";

import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { getSingleProductDetail } from "@/redux/features/product/productSlice";
import { getProductImage } from "@/redux/features/quotation/quotationSlice";
import React, { FormEvent, useState } from "react";

const SingleProductImage = () => {
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product);

  const [productCode, setProductCode] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setError(null);
      setImageUrl(null);
      //   const res = await fetch(
      //     "/api/cloudflare-r2/product-images/single-image",
      //     {
      //       method: "POST",
      //       headers: { "Content-Type": "application/json" },
      //       body: JSON.stringify({ key: `${productCode}.jpeg` }),
      //     }
      //   );

      //   if (!res.ok) throw new Error("Image not found");

      if (productCode) {
        await dispatch(getSingleProductDetail(productCode));
      }
      const response = await dispatch(getProductImage(productCode));

      if (response.meta.requestStatus === "rejected") {
        setError("No Image");
        setImageUrl(null);
      }

      setImageUrl(response.payload as string);

      //   const blob = await res.blob();
      //   const url = URL.createObjectURL(blob);
      //   setImageUrl(url);
    } catch (err: any) {
      setImageUrl(null);
      setError(err.message);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <form onSubmit={handleSubmit} className="space-x-2">
        <input
          type="text"
          value={productCode}
          onChange={(e) => setProductCode(e.target.value)}
          className="border border-gray-400 px-2 py-1"
          placeholder="Enter product code"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          Fetch Image
        </button>
      </form>

      {error && <p className="text-red-500">Error: {error}</p>}

      {imageUrl && (
        <img
          src={imageUrl}
          alt={`Product ${productCode}`}
          className="border max-w-xs mt-4"
        />
      )}
      <div>Product Code : {product.productCode}</div>
      <div>Description : {product.description}</div>
      <div>Oum : {product.oum}</div>
      <div>Unit Price : {product.unitPrice}</div>
    </div>
  );
};

export default SingleProductImage;
