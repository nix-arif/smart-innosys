"use client";

import React from "react";
import dynamic from "next/dynamic";
const MDAInput = dynamic(() => import("./MdaInput"), { ssr: false });

const PDFHightligter = () => {
  return <MDAInput />;
};

export default PDFHightligter;
