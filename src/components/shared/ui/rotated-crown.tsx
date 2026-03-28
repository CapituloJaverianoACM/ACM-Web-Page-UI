import { IconCrown } from "@tabler/icons-react";

export interface RotatedCrownProps {
  className: string;
}

export const RotatedCrown: React.FC<RotatedCrownProps> = ({ className }) => {
  return (
    <div
      className={`absolute z-15 -top-14 lg:-top-10 left-[40%] transform -translate-x-1/2 -rotate-12 lg:-rotate-24 ${className}`}
    >
      <IconCrown className="hidden lg:flex" size={65} />
      <IconCrown className="flex lg:hidden" size={45} />
    </div>
  );
};
