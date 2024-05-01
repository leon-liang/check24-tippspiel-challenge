interface BannerProps {
  title: string;
  descriptions?: string[];
}

const Banner = ({ title, descriptions }: BannerProps) => {
  return (
    <div
      className="flex h-96 flex-col justify-center gap-8 bg-[#FBF7FE] px-32"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E\")",
      }}
    >
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
