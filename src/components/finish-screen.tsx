interface Props {
  userPoints: number;
  totalPoints: number;
  highestScore: number;
}
export function FinishScreen({ userPoints, totalPoints, highestScore }: Props) {
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
    </>
  );
}
