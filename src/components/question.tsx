import type { Question } from "../App";

interface Props {
  question: Question;
}
export function Question({ question }: Props) {
  return <div>question</div>;
}
