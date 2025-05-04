"use client";

import axios from "axios";
import React, { FormEvent, useState } from "react";
import { Button } from "./ui/button";

const PDFForm = () => {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!data.firstname || !data.lastname || !data.description) return;
    setIsLoading(true);
    await axios.post("/api/generate-pdf", data);
    setIsLoading(false);

    window.location.reload();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-[40%] flex flex-col gap-y-4 p-8 h-[500px]"
    >
      <h1 className="text-lg font-medium text-gray-500">
        Please Complete The Form
      </h1>
      <label htmlFor="">Firstname</label>
      <input
        onChange={(e) => setData({ ...data, firstname: e.target.value })}
      />

      <label htmlFor="">Lastname</label>
      <input onChange={(e) => setData({ ...data, lastname: e.target.value })} />

      <label htmlFor="">Description</label>
      <input
        onChange={(e) => setData({ ...data, description: e.target.value })}
      />
      <Button disabled={isLoading}>
        {isLoading ? "generating..." : "generate my pdf"}
      </Button>
    </form>
  );
};

export default PDFForm;
