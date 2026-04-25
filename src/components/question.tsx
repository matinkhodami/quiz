import { useEffect } from "react";
import type { Question } from "../App";
import { Options } from "./options";
import ShakeButton from "./shake-button";

interface Props {
  question: Question;
  onSetAnswer: (answer: number) => void;
  onNextQuestion: () => void;
  onFinish: () => void;
  currentAnswer: number | null;
  isLast: boolean;
  time: number;
}
export function Question({
  question,
  onSetAnswer,
  currentAnswer,
  onNextQuestion,
  onFinish,
  isLast,
  time,
}: Props) {
  useEffect(() => {
    if (time === 0) onFinish();
  }, [time]);
  const min = Math.floor(time / 60);
  const sec = time % 60;
  return (
    <div className="flex flex-col max-w-100 mx-auto! gap-6">
      <h1>{question.question}</h1>
      <Options
        options={question.options}
        onSetAnswer={onSetAnswer}
        currentAnswer={currentAnswer}
        correctAnswer={question.correctOption}
      />
      <div className="flex justify-between items-center-safe">
        <div className="bg-dark px-4! py-2! inset-shadow-sm inset-shadow-medium/10 font-bold rounded-full">
          {(min < 10 ? "0" : "") + min}:{(sec < 10 ? "0" : "") + sec}
        </div>
        <ShakeButton
          disable={currentAnswer === null}
          onClick={isLast ? onFinish : onNextQuestion}
        >
          {isLast ? "Result" : "Next"}
        </ShakeButton>
      </div>
    </div>
  );
}
