import { ProgressBar } from "./progress-bar";

interface Props {
  totalPoints: number;
  totalQuestions: number;
  currentPoints: number;
  currentQuestion: number;
}
export function QuestionProgress({
  totalPoints,
  totalQuestions,
  currentPoints,
  currentQuestion,
}: Props) {
  return (
    <div className="mb-6!">
      <ProgressBar numerator={currentQuestion} denominator={totalQuestions} />
      <div className="flex justify-between">
        <p>
          <span className="font-bold text-light!">{currentQuestion}</span> /{" "}
          {totalQuestions}
        </p>
        <p>
          <span className="font-bold text-light!">{currentPoints}</span> /{" "}
          {totalPoints} <span className="font-bold text-light!">Points</span>
        </p>
      </div>
    </div>
  );
}
