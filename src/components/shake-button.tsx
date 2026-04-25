import { useState } from "react";
import { cn } from "../utils/cn";

interface ShakeButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disable: boolean;
}

const ShakeButton: React.FC<ShakeButtonProps> = ({
  children,
  disable,
  onClick,
  className = "",
}) => {
  const [isShaking, setIsShaking] = useState(false);

  return (
    <button
      onClick={() => {
        if (disable) {
          setIsShaking(true);
          setTimeout(() => {
            setIsShaking(false);
          }, 600);
        } else if (typeof onClick === "function") {
          onClick();
        }
      }}
      className={cn(
        "px-4! py-2! bg-dark rounded-full font-semibold transition-colors duration-200 inset-shadow-sm inset-shadow-medium/20",
        disable
          ? "cursor-not-allowed text-medium opacity-60"
          : "cursor-pointer text-light!",
        isShaking ? "animate-shake" : "",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default ShakeButton;
