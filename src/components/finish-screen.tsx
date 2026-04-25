interface Props {
  userPoints: number;
  totalPoints: number;
  highestScore: number;
  onReset: () => void;
}
export function FinishScreen({
  userPoints,
  totalPoints,
  highestScore,
  onReset,
}: Props) {
  const percentage = (userPoints / totalPoints) * 100;
  return (
    <>
      <p className="text-center py-3! bg-dark rounded-full">
        You scored <strong>{userPoints}</strong> out of {totalPoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="text-center mt-4! underline underline-offset-3">
        Highest score: {highestScore}
      </p>
      <div className="flex justify-between">
        
        <button
          className="bg-dark mt-6! px-6! py-3! inset-shadow-sm inset-shadow-medium/10 font-bold text-xl rounded-full cursor-pointer transition-all duration-150 outline-0 border-0  hover:scale-105 hover:bg-darkest hover:border-3 hover:border-medium/50"
          onClick={onReset}
        >
          Reset Test
        </button>
      </div>
    </>
  );
}
