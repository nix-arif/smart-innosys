"use client";

import { useGetDashboardMetricsQuery } from "@/redux/state/api";

const CardTopCustomer = () => {
  const { isLoading } = useGetDashboardMetricsQuery();
  // const smartInnosysInvoice = data?.smartInnosysInvoice || [];
  // const affirmaInvoice = data?.affirmaInvoice || [];

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          <h3 className="text-lg font-semibold px-7 pt-5 pb-2">Top Customer</h3>
          <hr />
          <div className="overflow-auto h-full"></div>
        </>
      )}
    </div>
  );
};

export default CardTopCustomer;
