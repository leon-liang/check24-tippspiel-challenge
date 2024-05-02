import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/tooltip/Tooltip";
import { CopyToClipboard as ReactCopyToClipboard } from "react-copy-to-clipboard";
import { useEffect, useState } from "react";
import useMouseLeave from "@/hooks/use-mouse-leave";

interface CopyToClipboardProps {
  text: string;
}

const CopyToClipboard = ({ text }: CopyToClipboardProps) => {
  const [mouseLeft, ref] = useMouseLeave();
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (mouseLeft) {
      setCopied(false);
    }
  }, [mouseLeft]);

  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger
            ref={ref}
            onClick={(event) => {
              event.preventDefault();
            }}
          >
            <ReactCopyToClipboard text={text} onCopy={() => setCopied(true)}>
              <p className="flex cursor-default flex-row gap-1 rounded-md px-2 align-middle hover:bg-colors-gray-3">
                {text}
              </p>
            </ReactCopyToClipboard>
          </TooltipTrigger>
          <TooltipContent
            onPointerDownOutside={(event) => {
              event.preventDefault();
            }}
          >
            <p>{copied ? "Copied" : "Click to copy"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default CopyToClipboard;
