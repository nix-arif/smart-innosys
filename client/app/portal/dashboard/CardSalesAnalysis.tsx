"use client";

import { convertToMMMYY, createTimeArray } from "@/lib/helper";
import { useGetDashboardMetricsQuery } from "@/redux/state/api";
import Decimal from "decimal.js";
import _ from "lodash";
import { TrendingUp } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

interface ICustomToolip {
  active: any;
  payload: any;
  label: any;
}

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface Invoice {
  invoiceDate: string;
  totalPrice: number;
}

interface MonthlyData {
  time: string;
  salesInnosys: Decimal;
  salesAffirma: Decimal;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  const nf = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
  });

  if (active) {
    return (
      <div className="custom-tooltip bg-slate-200 p-5 rounded-3xl opacity-90 shadow-2xl border border-slate-600">
        <p className="label font-extrabold">{`${label}`}</p>
        <p className="label text-[#3182ce] font-bold">{`Innosys : ${nf.format(
          Number(payload?.[0].value)
        )}`}</p>
        <p className="label text-[#f43f5e] font-bold">{`Affirma : ${nf.format(
          Number(payload?.[1].value)
        )}`}</p>
        <p className="label font-black">{`Total : ${nf.format(
          Number(payload?.[0].value) + Number(payload?.[1].value)
        )}`}</p>
      </div>
    );
  }

  return null;
};

const CardSalesAnalysis = () => {
  const [timeframe, setTimeframe] = useState("monthly");
  const { data, isLoading, isError } = useGetDashboardMetricsQuery();
  const todayDate = new Date();

  const timeArray = createTimeArray("2023-10-01", todayDate.toDateString());

  const smartInnosysInvoice: Invoice[] = data?.smartInnosysInvoice || [];
  const affirmaInvoice: Invoice[] = data?.affirmaInvoice || [];

  const monthlyDataArrayInnosys: Record<string, Decimal> = _.reduce(
    smartInnosysInvoice,
    (acc: Record<string, Decimal>, invoice) => {
      const dateMonthYear = invoice.invoiceDate.substring(0, 7); // 'YYYY-MM'
      const mmmyy = convertToMMMYY(dateMonthYear);
      acc[mmmyy] = (acc[mmmyy] || new Decimal(0)).plus(
        new Decimal(invoice.totalPrice)
      );
      return acc;
    },
    {}
  );

  const monthlyDataArrayAffirma: Record<string, Decimal> = _.reduce(
    affirmaInvoice,
    (acc: Record<string, Decimal>, invoice) => {
      const dateMonthYear = invoice.invoiceDate.substring(0, 7); // 'YYYY-MM'
      const mmmyy = convertToMMMYY(dateMonthYear);
      acc[mmmyy] = (acc[mmmyy] ? acc[mmmyy] : new Decimal(0)).plus(
        new Decimal(invoice.totalPrice).mul(new Decimal(0.7))
      );
      return acc;
    },
    {}
  );

  console.log(monthlyDataArrayAffirma);

  const multiply = new Decimal(19750).mul(new Decimal(0.7));
  console.log(multiply.toString());

  const monthlyDataArray: MonthlyData[] = timeArray.map((item) => {
    const timeKey = item.time; // This should match the format used in grouping
    const date = new Date(timeKey); // Assuming timeKey is in a valid date format
    const formattedTime = `${month[date.getMonth()]}${date
      .getFullYear()
      .toString()
      .slice(2, 4)}`; // Format as 'Oct23'

    return {
      ...item, // Use the formatted time here
      salesInnosys: monthlyDataArrayInnosys[timeKey] || new Decimal(0),
      salesAffirma: monthlyDataArrayAffirma[timeKey] || new Decimal(0),
    };
  });

  console.log(monthlyDataArrayInnosys["Oct23"]);
  //   console.log(timeArray);

  const totalValueSum = monthlyDataArray.reduce(
    (sum, item) => sum.plus(item.salesInnosys).plus(item.salesAffirma),
    new Decimal(0)
  );

  const averageChangePercentage = 0; // Compute based on your logic
  const highestValueDate = "N/A"; // Implement logic to find this

  if (isLoading) return <div className="m-5">Loading...</div>;
  if (isError) return <div className="m-5">Failed to fetch data</div>;

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold mb-2 px-7 pt-5">Sales Summary</h2>
        <hr />
      </div>
      <div>
        <div className="flex justify-between items-center mb-6 px-7 mt-5">
          <div className="text-lg font-medium">
            <p className="text-xs text-gray-400">Value</p>
            <span className="text-2xl font-extrabold">
              <span className="text-sm">MYR </span>
              {totalValueSum
                .dividedBy(1000)
                .toNumber()
                .toLocaleString("en", { minimumFractionDigits: 1 })}
              k
            </span>
            <span className="text-green-500 text-sm ml-2">
              <TrendingUp className="inline w-4 h-4 mr-1" />
              {averageChangePercentage.toFixed(2)}%
            </span>
          </div>
          <select
            className="shadow-sm border border-gray-300 bg-white p-2 rounded"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="monthly">Monthly</option>
            {/* Add other timeframe options here */}
          </select>
        </div>
        <ResponsiveContainer width="100%" height={350} className="px-7">
          <BarChart
            data={monthlyDataArray}
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="" vertical={false} />
            <XAxis dataKey="time" tick={false} />
            <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
            <Tooltip
              formatter={(value) => [`MYR ${value.toLocaleString("en")}`]}
              content={<CustomTooltip />}
            />
            <Bar
              dataKey="salesInnosys"
              stackId="a"
              fill="#3182ce"
              barSize={10}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="salesAffirma"
              stackId="a"
              fill="#f43f5e"
              barSize={10}
              radius={[10, 10, 0, 0]}
            />
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <hr />
        <div className="flex justify-between items-center mt-6 text-sm px-7 mb-4">
          <p>Total Active Business {monthlyDataArray.length} Months</p>
          <p className="text-sm">
            Highest Sales Date:{" "}
            <span className="font-bold">{highestValueDate}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardSalesAnalysis;
