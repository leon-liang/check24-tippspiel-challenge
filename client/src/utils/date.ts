import { DateTime } from "luxon";

// Returns the closest date in the dates array to the current date
export const getClosestDate = (currentDate: DateTime, dates: DateTime[]) => {
  let differences = dates.map((date) => currentDate.diff(date, "days").days);

  let minIndex = differences.reduce(
    (minIndex, diff, index) =>
      Math.abs(diff) < differences[minIndex] ? index : minIndex,
    0,
  );
  return dates[minIndex];
};
