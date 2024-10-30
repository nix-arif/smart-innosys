"use client";

import _ from "lodash";
import { useGetDashboardMetricsQuery } from "@/redux/state/api";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import Decimal from "decimal.js";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

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

// interface ICustomToolip {
//   active: any;
//   payload: any;
//   label: any;
// }

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
        <p className="label text-[#006A4E] font-bold">{`YTD Balance : ${nf.format(
          Number(payload?.[0].value)
        )}`}</p>
        <p className="label text-[#f43f5e] font-bold">{`BOD Contribution : ${nf.format(
          Number(payload?.[1].value)
        )}`}</p>
      </div>
    );
  }

  return null;
};

const CardBreakEven = () => {
  const { data, isLoading } = useGetDashboardMetricsQuery();

  const monthlyDataArray = [];
  const ytdDataArray: { time: string; ytd: string; contributionBOD: string }[] =
    [];
  const ledger = data?.smartInnosysLedger;

  if (ledger) {
    const group = _.groupBy(ledger, ({ date }) => date.substring(0, 7));

    for (const property in group) {
      let tempSum1 = new Decimal(0);
      let tempSum2 = new Decimal(0);

      group[property].forEach((item) => {
        tempSum1 = tempSum1.plus(new Decimal(item.amount));
        if (
          item.receiveFrom === "amli" ||
          item.receiveFrom === "mr syed" ||
          item.receiveFrom === "mr atiki"
        ) {
          tempSum2 = tempSum2.plus(new Decimal(item.amount));
        }
      });

      const dateToProcess = new Date(group[property][0].date);
      const dateMonthYear = `${month[dateToProcess.getMonth()]}${dateToProcess
        .getFullYear()
        .toString()
        .slice(2, 4)}`;

      monthlyDataArray.push({
        time: dateMonthYear,
        ytd: tempSum1,
        contributionBOD: tempSum2,
      });
    }
  }

  monthlyDataArray.reverse();

  let tempSum1 = new Decimal(0);
  let tempSum2 = new Decimal(0);

  monthlyDataArray.forEach((item) => {
    tempSum1 = tempSum1.plus(item.ytd);
    tempSum2 = tempSum2.plus(item.contributionBOD);
    ytdDataArray.push({
      time: item.time,
      ytd: tempSum1.toString(),
      contributionBOD: tempSum2.toString(),
    });
  });

  const ytdDataArrayNumber = ytdDataArray.map((item) => {
    return {
      ...item,
      ytd: Number(item.ytd),
      contributionBOD: Number(item.contributionBOD),
    };
  });

  return (
    <div className="flex flex-col justify-between row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-white shadow-md rounded-2xl">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          {/* HEADER */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Breakeven Timeline
            </h2>
            <hr />
          </div>

          {/* BODY */}
          <ResponsiveContainer width="100%" height={220} className="p-2">
            <AreaChart
              width={730}
              height={250}
              data={ytdDataArrayNumber}
              margin={{ top: 10, right: 30, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#80EF80" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#80EF80" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF3333" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FF3333" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" />
              <YAxis
                axisLine={false}
                style={{
                  fontSize: "0.8rem",
                }}
                tickCount={4}
                tickFormatter={(number) => {
                  //   const formatter = new Intl.NumberFormat("en-US", {
                  //     style: "currency",
                  //     currency: "MYR",
                  //   });
                  const formatNumber = (num: number, precision = 0): string => {
                    const map = [
                      { suffix: "T", threshold: 1e12 },
                      { suffix: "B", threshold: 1e9 },
                      { suffix: "M", threshold: 1e6 },
                      { suffix: "K", threshold: 1e3 },
                      { suffix: "", threshold: 1 },
                    ];

                    const found = map.find((x) => Math.abs(num) >= x.threshold);
                    if (found) {
                      const formatted =
                        (num / found.threshold).toFixed(precision) +
                        found.suffix;
                      return formatted;
                    }

                    return num.toString();
                  };
                  //   return formatter.format(number).slice(3);
                  return formatNumber(number);
                }}
              />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="ytd"
                stroke="#006A4E"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
              <Area
                type="monotone"
                dataKey="contributionBOD"
                stroke="#FA2A55"
                fillOpacity={1}
                fill="url(#colorPv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};

export default CardBreakEven;
