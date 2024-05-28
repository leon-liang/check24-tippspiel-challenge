interface CommunityPreviewProps {
  communityName: string;
}

const CommunityPreview = ({ communityName }: CommunityPreviewProps) => {
  return <div>{communityName}</div>;
};

export default CommunityPreview;
