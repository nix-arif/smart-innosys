import React from "react";
import CreateCustomer from "./CreateCustomer";
import ViewCustomer from "./ViewCustomer";

const page = () => {
  return (
    <div className="p-5">
      <CreateCustomer />
      {/* <ViewCustomer /> */}
    </div>
  );
};

export default page;
