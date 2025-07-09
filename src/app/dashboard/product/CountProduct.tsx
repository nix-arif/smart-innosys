"use client";

import axios from "axios";
import React, { useEffect } from "react";

const CountProduct = () => {
  useEffect(() => {
    const fetchCount = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/cloudflare-r2/count"
      );
      console.log(response.data);
    };

    fetchCount();
  }, []);

  return <div>CountProduct : </div>;
};

export default CountProduct;
