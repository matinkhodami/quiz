import { cn } from "../utils/cn";

interface Props {
  options: string[];
  onSetAnswer: (answer: number) => void;
  currentAnswer: number | null;
  correctAnswer: number;
}
export function Options({
  options,
  onSetAnswer,
  currentAnswer,
  correctAnswer,
}: Props) {
  const hasAnswer = currentAnswer !== null;
  const defaultButtonStyle =
    "bg-dark py-3! rounded-full inset-shadow-sm inset-shadow-medium/10 hover:bg-darkest hover:shadow-[0_0_0_2px_rgba(255,255,255,0.5)] duration-300 transition-all cursor-pointer text-left px-6! hover:scale-[1.02] active:scale-[0.98] hover:translate-x-6";
  return (
    <div className="w-full flex flex-col gap-2">
      {options.map((option, index) => (
        <button
          key={option}
          className={cn(
            defaultButtonStyle,
            hasAnswer &&
              "hover:scale-100! active:scale-100! font-bold! text-light! cursor-not-allowed! hover:translate-x-0! inset-shadow-sm inset-shadow-white/50 border-0 outline-0 hover:shadow-none",
            index === currentAnswer && "translate-x-6! hover:translate-x-6!",
            hasAnswer &&
              (index === correctAnswer
                ? "bg-green-300 text-green-900! hover:bg-green-400 inset-shadow-sm inset-shadow-green-500/50"
                : "bg-rose-300 text-rose-900! hover:bg-rose-400 inset-shadow-sm inset-shadow-rose-500/50"),
          )}
          onClick={() => {
            currentAnswer === null && onSetAnswer(index);
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
