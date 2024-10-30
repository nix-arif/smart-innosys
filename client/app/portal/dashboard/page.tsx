import CardBreakEven from "./CardBreakEven";
import CardSalesAnalysis from "./CardSalesAnalysis";
import CardTopCustomer from "./CardTopCustomer";

const page = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <CardTopCustomer />
      <CardSalesAnalysis />
      <CardBreakEven />
      <div className="row-span-3 bg-gray-500" />
      <div className="md:row-span-1 xl:row-span-2 bg-gray-500" />
      <div className="md:row-span-1 xl:row-span-2 bg-gray-500" />
      <div className="md:row-span-1 xl:row-span-2 bg-gray-500" />
    </div>
  );
};

export default page;
