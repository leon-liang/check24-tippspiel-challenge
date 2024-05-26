import Tag from "@/components/tag/Tag";
import DotIcon from "@/components/icons/DotIcon";
import { colors } from "../../../tailwind.config";
import { DateTime, Interval } from "luxon";

interface Team {
  name?: string;
  bet?: number;
  result?: number;
}

interface GameViewProps {
  homeTeam: Team;
  awayTeam: Team;
  gameTime: DateTime;
  currentDate: DateTime;
}

const GameView = ({
  homeTeam,
  awayTeam,
  gameTime,
  currentDate,
}: GameViewProps) => {
  // Maximum duration of a match is 120 min
  const gameDuration = Interval.fromDateTimes(
    gameTime,
    gameTime.plus({ minute: 120 }),
  );

  return (
    <div className="w-full rounded-md border border-gray-6 bg-colors-white-A12 transition duration-200 hover:shadow-lg">
      <div className="flex flex-row items-center gap-3 rounded-t-md border-b border-gray-6 bg-colors-indigo-2 py-1 pl-4 pr-1 text-gray-11">
        {gameDuration.contains(currentDate) ? (
          <Tag
            text="Live"
            icon={<DotIcon width={12} height={12} stroke={colors.red["11"]} />}
          />
        ) : null}
        <div className="p-1 font-mono text-sm">
          {gameTime.setLocale("en").toLocaleString(DateTime.DATETIME_SHORT)}
        </div>
      </div>
      <table className="w-full overflow-clip">
        <thead className="text-sm text-gray-11">
          <tr>
            <th className="px-6 pt-2 text-center font-normal" scope="col"></th>
            <th
              className="whitespace-nowrap px-6 pt-2 text-center font-normal"
              scope="col"
            >
              Your Bet
            </th>
            <th className="whitespace-nowrap px-6 pt-2 font-normal" scope="col">
              Result
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" className="px-4 pb-1 pt-2 text-start font-normal">
              {homeTeam.name ?? "N/A"}
            </th>
            <td className="px-6 pb-1 pt-2 text-center text-lg">
              {homeTeam.bet ?? "-"}
            </td>
            <td className="px-6 pb-1 pt-2 text-center text-lg">
              {homeTeam.result ?? "-"}
            </td>
          </tr>
          <tr>
            <th scope="row" className="px-4 pb-2 pt-1 text-start font-normal">
              {awayTeam.name ?? "N/A"}
            </th>
            <td className="px-6 pb-2 pt-1 text-center text-lg">
              {awayTeam.bet ?? "-"}
            </td>
            <td className="px-6 pb-2 pt-1 text-center text-lg">
              {awayTeam.result ?? "-"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GameView;
