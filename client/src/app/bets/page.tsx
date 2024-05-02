import Banner from "@/components/banner/Banner";

const Bets = () => {
  return (
    <div>
      <Banner title="Your bets">
        <p>{"Place your bet by predicting the final score of the game."}</p>
        <p>
          {
            "Betting is available until the game starts, after which no further bets can be placed."
          }
        </p>
      </Banner>
    </div>
  );
};

export default Bets;
