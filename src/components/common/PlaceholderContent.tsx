
import { Button } from "@/components/ui/button";

interface PlaceholderContentProps {
  title: string;
  description: string;
  buttonLabel?: string;
  onClick?: () => void;
}

const PlaceholderContent = ({
  title,
  description,
  buttonLabel,
  onClick,
}: PlaceholderContentProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-4 text-center">
      <h3 className="text-xl font-semibold text-muted-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-md mb-6">{description}</p>
      {buttonLabel && onClick && (
        <Button onClick={onClick}>{buttonLabel}</Button>
      )}
    </div>
  );
};

export default PlaceholderContent;
