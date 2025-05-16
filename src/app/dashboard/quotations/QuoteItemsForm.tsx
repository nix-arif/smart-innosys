"use client";

import { getProduct } from "@/actions/products";
import React, { ChangeEvent, useState } from "react";

type QuoteItem = {
  productCode: string;
  description: string;
  qty: number;
  oum: string;
  unitPrice: number;
  subtotal: number;
};

const QuoteItemsForm = () => {
  const [totalItemToQuote, setTotalItemToQuote] = useState(0);
  const [data, setData] = useState<QuoteItem[]>([]);

  const handleNumberItemQuote = (e: ChangeEvent<HTMLInputElement>) => {
    const numberOfItems = +e.target.value;
    setTotalItemToQuote(+e.target.value);

    const newData: QuoteItem[] = Array.from({ length: numberOfItems }, () => ({
      productCode: "",
      description: "",
      qty: 0,
      oum: "",
      unitPrice: 0,
      subtotal: 0,
    }));

    setData(newData);
  };

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    // if (e.target.name === "productCode") {
    //   const newData = data.map((item, i) => {
    //     if (index === i) return { ...item, [e.target.name]: e.target.value };
    //     return item;
    //   });
    //   setData(newData);
    //   const res = await getProduct(e.target.value);
    //   const other = data.map((item, i) => {
    //     if (index === i)
    //       return {
    //         ...newData,
    //         description: res?.description || "no item",
    //         unitPrice: res?.unitPrice || 0,
    //         oum: res?.oum || 0,
    //         subtotal: res?.unitPrice || 0,
    //       };
    //     return item;
    //   });
    //   setData(other);
    // }
    const { name, value } = e.target;
    const updatedData = [...data];

    let parsedValue: string | number = value;
    if (["qty", "unitPrice", "subtotal"].includes(name)) {
      parsedValue = +value;
    }

    updatedData[index] = {
      ...updatedData[index],
      [name]: parsedValue,
    };

    if (name === "productCode") {
      const res = await getProduct(value);
      updatedData[index] = {
        ...updatedData[index],
        description: res?.description || "no item",
        unitPrice: res?.unitPrice || 0,
        oum: res?.oum || "",
        subtotal: res?.unitPrice || 0,
      };
    }
    setData(updatedData);
  };

  return (
    <div className="min-w-[800px]">
      <form className="w-full grid grid-cols-12 gap-6">
        <label htmlFor="numberOfItem" className="col-span-6">
          Number of Item
        </label>
        <input
          id="numberOfItem"
          className="border border-slate-400 col-span-6"
          onChange={handleNumberItemQuote}
          value={totalItemToQuote}
        />

        {data.length > 0 && (
          <table className="col-span-12">
            <thead>
              <tr>
                <th className="w-[5%]">NO</th>
                <th className="w-[10%]">PRODUCT CODE</th>
                <th className="w-[55%]">DESCRIPTION</th>
                <th className="w-[5%]">QTY</th>
                <th className="w-[5%]">OUM</th>
                <th className="w-[10%]">UNIT PRICE</th>
                <th className="w-[10%]">SUBTOTAL</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      value={index}
                      disabled
                      className="text-center w-full"
                      name="no"
                    />
                  </td>
                  <td>
                    <input
                      value={item.productCode}
                      onChange={(e) => handleChange(e, index)}
                      className="text-center w-full"
                      name="productCode"
                    />
                  </td>
                  <td>
                    <input
                      value={item.description}
                      onChange={(e) => handleChange(e, index)}
                      className="w-full"
                      name="description"
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      value={item.qty}
                      onChange={(e) => handleChange(e, index)}
                      className="text-center w-full"
                      name="qty"
                    />
                  </td>
                  <td>
                    <input
                      value={item.oum}
                      onChange={(e) => handleChange(e, index)}
                      className="text-center w-full"
                      name="oum"
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      value={item.unitPrice}
                      onChange={(e) => handleChange(e, index)}
                      className="text-center w-full"
                      name="unitPrice"
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      value={item.subtotal}
                      onChange={(e) => handleChange(e, index)}
                      className="text-center w-full"
                      name="subtotal"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </form>
    </div>
  );
};

export default QuoteItemsForm;
