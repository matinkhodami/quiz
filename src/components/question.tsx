import type { Question } from "../App";
import { Options } from "./options";

interface Props {
  question: Question;
  onSetAnswer: (answer: number) => void;
  currentAnswer: number | null;
}
export function Question({ question, onSetAnswer, currentAnswer }: Props) {
  return (
    <div className="flex flex-col max-w-100 mx-auto! gap-6">
      <h1>{question.question}</h1>
      <Options
        options={question.options}
        onSetAnswer={onSetAnswer}
        currentAnswer={currentAnswer}
        correctAnswer={question.correctOption}
      />
    </div>
  );
}
