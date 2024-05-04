interface GameViewProps {}

const GameView = () => {
  return (
    <div className="w-full rounded-md border border-gray-6 transition duration-200 hover:shadow-lg ">
      <div className="flex flex-row items-center justify-between rounded-t-md border-b border-gray-6 bg-colors-indigo-2 py-1 pl-4 pr-1 text-gray-11">
        <div className="font-mono">18:00</div>
      </div>
      <table className="w-full">
        <thead className="text-sm text-gray-11">
          <tr>
            <th className="px-6 pt-2 text-center font-normal" scope="col"></th>
            <th className="px-6 pt-2 text-center font-normal" scope="col">
              Your Bet
            </th>
            <th className="px-6 pt-2 font-normal" scope="col">
              Result
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" className="px-4 pb-1 pt-2 text-start font-normal">
              Luxembourg
            </th>
            <td className="px-6 pb-1 pt-2 text-center text-lg">2</td>
            <td className="px-6 pb-1 pt-2 text-center text-lg">-</td>
          </tr>
          <tr>
            <th scope="row" className="px-4 pb-2 pt-1 text-start font-normal">
              Armenia
            </th>
            <td className="px-6 pb-2 pt-1 text-center text-lg">0</td>
            <td className="px-6 pb-2 pt-1 text-center text-lg">-</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GameView;
