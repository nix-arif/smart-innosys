"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChangeEvent } from "react";
import { useLocalStorage } from "usehooks-ts";

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
  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const updatedInto = [...itemsInfoData];
    updatedInto[index].productCode = value;
    setItemsInfoData(updatedInto);
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
                <td>
                  <input className="w-full" />
                </td>
                <td>
                  <input className="w-full" />
                </td>
                <td>
                  <input className="w-full" />
                </td>
                <td>
                  <input className="w-full" />
                </td>
                <td>
                  <input className="w-full" />
                </td>
                <td>
                  <input className="w-full" />
                </td>
                <td>
                  <input className="w-full" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default ItemsInfo;
