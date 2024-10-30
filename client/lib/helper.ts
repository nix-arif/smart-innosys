import moment from "moment";

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

export const createTimeArray = (start: string, end: string) => {
  const result: { time: string }[] = [];
  const startDate = new Date(start);
  const endDate = new Date(end);
  const totalMonthToLoop = moment(endDate).diff(
    moment(startDate),
    "months",
    true
  );

  let startYear = startDate.getFullYear(),
    endYear = endDate.getFullYear(),
    startMonth = startDate.getMonth() + 1;

  let i = 0;
  let monthCounterToDeduct = 0;
  let startCounterDeduction = 0;
  let yearToDisplay = Number(startYear);
  while (i < totalMonthToLoop) {
    let monthCounter = startMonth + i - startCounterDeduction;
    if (monthCounter <= 12) {
      result.push({
        time: `${month[monthCounter - 1]}${yearToDisplay
          .toString()
          .slice(2, 4)}`,
      });
      if (monthCounter === 12) {
        startMonth = 0;
        startCounterDeduction = monthCounterToDeduct;
        yearToDisplay++;
      }

      monthCounterToDeduct++;
    }
    monthCounter++;
    i++;
  }

  return result;
};

export function convertToMMMYY(dateString: string) {
  // Ensure the date string is valid and in 'YYYY-MM' format
  const regex = /^\d{4}-\d{2}$/;
  if (!regex.test(dateString)) {
    throw new Error("Invalid date format. Expected 'YYYY-MM'.");
  }

  const [year, month] = dateString.split("-");

  // Array of month names
  const monthNames = [
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

  // Get the month index (0-based) and use it to get the abbreviated month name
  const monthIndex = parseInt(month, 10) - 1; // Convert month to index
  const abbreviatedMonth = monthNames[monthIndex];

  return `${abbreviatedMonth}${year.slice(2)}`; // Return 'MMMYY'
}
