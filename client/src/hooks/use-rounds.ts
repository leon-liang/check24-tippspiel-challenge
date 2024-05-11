import { useMemo } from "react";
import { DateTime, Interval } from "luxon";

// Match day 1    [14.06; 19.06)
// Match day 2    [19.06; 23.06)
// Match day 3    [23.06; 27.06)
// Round of 16    [29.06; 03.07)
// Quarter Finals [05.07; 07.07)
// Semi Finals    [09.07; 11.07)
// Finals         [14.07; 15.07)

const useRounds = () => {
  return useMemo(
    () => [
      {
        name: "Match day 1",
        dates: Interval.fromDateTimes(
          DateTime.local(2024, 6, 14),
          DateTime.local(2024, 6, 19),
        ),
      },
      {
        name: "Match day 2",
        dates: Interval.fromDateTimes(
          DateTime.local(2024, 6, 19),
          DateTime.local(2024, 6, 23),
        ),
      },
      {
        name: "Match day 3",
        dates: Interval.fromDateTimes(
          DateTime.local(2024, 6, 23),
          DateTime.local(2024, 6, 27),
        ),
      },
      {
        name: "Round of 16",
        dates: Interval.fromDateTimes(
          DateTime.local(2024, 6, 29),
          DateTime.local(2024, 7, 3),
        ),
      },
      {
        name: "Quarter-finals",
        dates: Interval.fromDateTimes(
          DateTime.local(2024, 7, 5),
          DateTime.local(2024, 7, 7),
        ),
      },
      {
        name: "Semi-finals",
        dates: Interval.fromDateTimes(
          DateTime.local(2024, 7, 9),
          DateTime.local(2024, 7, 11),
        ),
      },
      {
        name: "Finals",
        dates: Interval.fromDateTimes(
          DateTime.local(2024, 7, 14),
          DateTime.local(2024, 7, 15),
        ),
      },
    ],
    [],
  );
};

export default useRounds;
