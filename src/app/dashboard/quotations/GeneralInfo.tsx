"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { ChangeEvent, useEffect, useState } from "react";

type GeneralInfoItem = {
  type: string;
  value: string;
  name: string;
  label: string;
};

type GeneralInfoDataProps = {
  generalInfoData: GeneralInfoItem[];
  setGeneralInfoData: React.Dispatch<React.SetStateAction<GeneralInfoItem[]>>;
};

const GeneralInfo = ({
  generalInfoData,
  setGeneralInfoData,
}: GeneralInfoDataProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    setGeneralInfoData((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], value };
      return updated;
    });
  };

  return (
    <Card>
      <CardContent>
        {generalInfoData.map((data, index) => (
          <div key={index} className="grid grid-cols-2 mb-0.5">
            <label htmlFor={data.name}>{data.label}</label>
            <input
              id={data.name}
              name={data.name}
              type={data.type || "text"}
              value={data.value ?? ""}
              onChange={(e) => handleChange(e, index)}
              className="border border-slate-500 px-2 rounded-md text-right"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default GeneralInfo;
