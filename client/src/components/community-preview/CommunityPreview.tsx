interface CommunityPreviewProps {
  communityName: string;
}

const CommunityPreview = ({ communityName }: CommunityPreviewProps) => {
  return (
    <div className="w-full rounded-md border border-gray-6 bg-colors-white-A12 hover:shadow-lg">
      <div className="rounded-t-md border-b border-gray-6 bg-colors-indigo-2 py-1 pl-4 pr-1 text-gray-11">
        <div className="p-1 font-mono text-sm">{communityName}</div>
      </div>
      <div className="h-[250px]"></div>
    </div>
  );
};

export default CommunityPreview;
