interface BannerProps {
  title: string;
  descriptions?: string[];
}

const Banner = ({ title, descriptions }: BannerProps) => {
  return (
    <div className="flex h-96 flex-col justify-center gap-8 bg-colors-purple-2 bg-topography-pattern px-32">
      <h1 className="text-4xl font-medium">{title}</h1>
      <div className="flex flex-col gap-1 text-gray-11">
        {descriptions?.map((description, i) => <p key={i}>{description}</p>)}
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

export default Banner;
