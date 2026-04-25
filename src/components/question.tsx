import type { Question } from "../App";
import { Options } from "./options";
import ShakeButton from "./shake-button";

interface Props {
  question: Question;
  onSetAnswer: (answer: number) => void;
  onNextQuestion: () => void;
  currentAnswer: number | null;
}
export function Question({
  question,
  onSetAnswer,
  currentAnswer,
  onNextQuestion,
}: Props) {
  return (
    <div className="flex flex-col max-w-100 mx-auto! gap-6">
      <h1>{question.question}</h1>
      <Options
        options={question.options}
        onSetAnswer={onSetAnswer}
        currentAnswer={currentAnswer}
        correctAnswer={question.correctOption}
      />
      <div className="flex">
        <ShakeButton
          className="ml-auto!"
          disable={currentAnswer === null}
          onClick={onNextQuestion}
        >
          Next
        </ShakeButton>
      </div>
    </div>
  );
}
