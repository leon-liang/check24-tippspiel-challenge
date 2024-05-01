import Banner from "@/components/banner/Banner";

const Bets = () => {
  return (
    <div>
      <Banner
        title="Your bets"
        descriptions={[
          "Place your bet by predicting the final score of the game.",
          "Betting is available until the game starts, after which no further bets can be placed.",
        ]}
      />
    </div>
  );
};

export default Bets;
