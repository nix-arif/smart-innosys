"use client";

import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { mdaProducts } from "@/redux/features/mdaProduct/mdaProductSlice";
import axios from "axios";
import React, { FormEvent, useState } from "react";

const MdaInput = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.mdaProduct);
  const [productCode, setProductCode] = useState("");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(mdaProducts(productCode));
  };

  const handleDownload = async () => {
    try {
      const res = await axios.post(
        "/api/cloudflare-r2/mda",
        { data },
        { responseType: "blob" }
      );

      const blob = res.data; // blob is ready
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "mda-extracted.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed", err);
      // optional: read error blob:
      // @ts-ignore
      if (err.response?.data) {
        const reader = new FileReader();
        reader.onload = () => console.error("Error response:", reader.result);
        // @ts-ignore
        reader.readAsText(err.response.data);
      }
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            className="border-1 border-black w-[80%] h-[300px]"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
          />
        </div>
        <button
          className="border border-gray-700 mx-5 px-5 m-5 py-2 rounded-md"
          type="submit"
        >
          Submit
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>NO</th>
            <th>PRODUCT CODE</th>
            <th>MDA REGISTRATION NO</th>
            <th>MDA PAGE NO</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product, idx) => (
            <tr
              key={idx}
              className={product.mdaRegistrationNo ? "" : "bg-red-400!"}
            >
              <td>{idx + 1}</td>
              <td>{product.productCode}</td>
              <td className="text-center">{product.mdaRegistrationNo}</td>
              <td className="text-center">{product.mdaPageNo}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="border border-gray-700 mx-5 px-5 mt-5 py-2 rounded-md"
        onClick={handleDownload}
      >
        Download File
      </button>
    </div>
  );
};

export default MdaInput;
