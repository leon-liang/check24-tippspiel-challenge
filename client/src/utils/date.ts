import { DateTime } from "luxon";

export const getClosestDate = (currentDate: string, dates: string[]) => {
  let differences = dates.map(
    (date) =>
      DateTime.fromISO(currentDate).diff(DateTime.fromISO(date), "days").days,
  );

  let minIndex = differences.reduce(
    (minIndex, diff, index) =>
      Math.abs(diff) < differences[minIndex] ? index : minIndex,
    0,
  );
  return dates[minIndex];
};
