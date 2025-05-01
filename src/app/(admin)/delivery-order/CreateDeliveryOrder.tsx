"use client";

import React, { ChangeEvent, useEffect, useState } from "react";

const CreateDeliveryOrder = () => {
  const [data, setData] = useState({
    deliveryOrderNo: "",
    date: new Date(Date.now()).toISOString().split("T")[0],
    customerTitle: "",
    customerName: "",
    organizationDept: "",
    organizationName: "",
    organizationAddressLine1: "",
    organizationAddressLine2: "",
    organizationAddressLine3: "",
    organizationPosscode: "",
    organizationCity: "",
    organizationState: "",
    organizationCountry: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  console.log(data);

  return (
    <form>
      <div>
        <label htmlFor="deliveryOrderNo">Delivery Order No</label>
        <input
          id="deliveryOrderNo"
          name="deliveryOrderNo"
          className="border border-slate-200 mx-5 px-2"
          value={data.deliveryOrderNo}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          name="date"
          className="border border-slate-200 mx-5 px-2"
          type="date"
          value={data.date}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="customerTitle">Customer Title</label>
        <input
          type="text"
          name="customerTitle"
          id="customerTitle"
          className="border border-slate-200 mx-5 px-2"
          value={data.customerTitle}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="customerName">Customer Name</label>
        <input
          type="text"
          name="customerName"
          id="customerName"
          className="border border-slate-200 mx-5 px-2"
          value={data.customerName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="organizationDept">Organization Department</label>
        <input
          type="text"
          name="organizationDept"
          id="organizationDept"
          className="border border-slate-200 mx-5 px-2"
          value={data.organizationDept}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="organizationName">Organization Name</label>
        <input
          type="text"
          name="organizationName"
          id="organizationName"
          className="border border-slate-200 mx-5 px-2"
          value={data.organizationName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="organizationAddressLine1">
          Organization Address Line 1
        </label>
        <input
          type="text"
          name="organizationAddressLine1"
          id="organizationAddressLine1"
          className="border border-slate-200 mx-5 px-2"
          value={data.organizationAddressLine1}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="organizationAddressLine2">
          Organization Address Line 2
        </label>
        <input
          type="text"
          name="organizationAddressLine2"
          id="organizationAddressLine2"
          className="border border-slate-200 mx-5 px-2"
          value={data.organizationAddressLine2}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="organizationAddressLine3">
          Organization Address Line 3
        </label>
        <input
          type="text"
          name="organizationAddressLine3"
          id="organizationAddressLine3"
          className="border border-slate-200 mx-5 px-2"
          value={data.organizationAddressLine3}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="organizationPosscode">Organization Posscode</label>
        <input
          type="text"
          name="organizationPosscode"
          id="organizationPosscode"
          className="border border-slate-200 mx-5 px-2"
          value={data.organizationPosscode}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="organizationCity">Organization City</label>
        <input
          type="text"
          name="organizationCity"
          id="organizationCity"
          className="border border-slate-200 mx-5 px-2"
          value={data.organizationCity}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="organizationState">Organization State</label>
        <input
          type="text"
          name="organizationState"
          id="organizationState"
          className="border border-slate-200 mx-5 px-2"
          value={data.organizationState}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="organizationCountry">Organization Country</label>
        <input
          type="text"
          name="organizationCountry"
          id="organizationCountry"
          className="border border-slate-200 mx-5 px-2"
          value={data.organizationCountry}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default CreateDeliveryOrder;
