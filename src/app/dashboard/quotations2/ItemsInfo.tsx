"use client";

import { getProduct } from "@/actions/products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChangeEvent, useRef } from "react";

type ItemInfo = {
  productCode: string;
  description: string;
  qty: number;
  oum: string;
  unitPrice: number;
  total: number;
};

type ItemsInfoDataProps = {
  itemsInfoData: ItemInfo[];
  setItemsInfoData: React.Dispatch<React.SetStateAction<ItemInfo[]>>;
};

const ItemsInfo = ({ itemsInfoData, setItemsInfoData }: ItemsInfoDataProps) => {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const handleChange = async (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof ItemInfo
  ) => {
    const { value } = e.target;
    const updatedItems = [...itemsInfoData];

    // Handle numeric fields correctly
    if (field === "qty" || field === "unitPrice") {
      updatedItems[index][field] = parseFloat(value) || 0;
    } else if (field === "productCode") {
      updatedItems[index][field] = value;
    }

    // Recalculate total
    updatedItems[index].total =
      updatedItems[index].qty * updatedItems[index].unitPrice;

    // Update state immediately for UI responsiveness
    setItemsInfoData(updatedItems);

    // Debounced productCode lookup
    if (field === "productCode") {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

      debounceTimeout.current = setTimeout(async () => {
        if (value.trim().length >= 3) {
          try {
            const product = await getProduct(value.trim());
            if (product) {
              const newItems = [...itemsInfoData];
              newItems[index].description = product.description;
              newItems[index].oum = product.oum;
              newItems[index].unitPrice = product.unitPrice;
              newItems[index].total =
                newItems[index].qty * newItems[index].unitPrice;
              setItemsInfoData(newItems);
            } else {
              const newItems = [...itemsInfoData];
              newItems[index].description = "REGRET NO OFFER";
              newItems[index].oum = "RNO";
              newItems[index].unitPrice = 0;
              newItems[index].total =
                newItems[index].qty * newItems[index].unitPrice;
              setItemsInfoData(newItems);
            }
          } catch (error) {
            console.error("Error fetching product:", error);
          }
        }
      }, 500);
    }
  };

  return (
    <Card>
      <CardContent>
        <table className="w-full">
          <thead>
            <tr>
              <th className="w-[5%]">NO</th>
              <th className="w-[15%]">PRODUCT CODE</th>
              <th className="w-[50%]">DESCRIPTION</th>
              <th className="w-[5%]">QTY</th>
              <th className="w-[5%]">OUM</th>
              <th className="w-[10%]">UNIT PRICE</th>
              <th className="w-[10%]">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {itemsInfoData.map((item, index) => (
              <tr key={index}>
                <td className="text-center">{index + 1}</td>
                <td>
                  <input
                    className="w-full text-center px-1"
                    value={item.productCode}
                    onChange={(e) => handleChange(e, index, "productCode")}
                  />
                </td>
                <td
                  className={`${
                    item.description === "REGRET NO OFFER" ? "bg-red-300" : ""
                  } px-2`}
                >
                  {item.description}
                </td>
                <td>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    className="w-full text-center"
                    value={item.qty}
                    onChange={(e) => handleChange(e, index, "qty")}
                  />
                </td>
                <td className="text-center">{item.oum}</td>
                <td>
                  <input
                    className="w-full text-right pr-2"
                    value={item.unitPrice}
                    onChange={(e) => handleChange(e, index, "unitPrice")}
                  />
                </td>
                <td className="text-right pr-2">{item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default ItemsInfo;
