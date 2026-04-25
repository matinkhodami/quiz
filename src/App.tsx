import { useEffect, useReducer } from "react";
import Header from "./components/header";
import Main from "./components/main";
import Loader from "./components/loader";
import Error from "./components/error";
import { StartScreen } from "./components/start-screen";
import { Question } from "./components/question";
import { QuestionProgress } from "./components/question-progress";
import { FinishScreen } from "./components/finish-screen";

export interface Question {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}
type Action =
  | { type: "RESET" }
  | { type: "DATA_RECEIVED"; payload: Question[] }
  | { type: "DATA_FAILED" }
  | { type: "START" }
  | { type: "ANSWER"; payload: number }
  | { type: "NEXT_QUESTION" }
  | { type: "SET_HIGHSCORE"; payload: number }
  | { type: "RESULT" };

interface StateType {
  questions: Question[];
  status: "LOADING" | "ERROR" | "READY" | "ACTIVE" | "FINISHED";
  index: number;
  answer: number | null;
  points: number;
  highestScore: number;
}
const initialState: StateType = {
  questions: [],
  status: "LOADING",
  index: 0,
  answer: null,
  points: 0,
  highestScore: 0,
};

function reducer(state: StateType, action: Action): StateType {
  switch (action.type) {
    case "DATA_RECEIVED":
      return {
        ...state,
        questions: action.payload,
        status: "READY",
      };
    case "START":
      return { ...state, status: "ACTIVE" };
    case "DATA_FAILED":
      return {
        ...state,
        status: "ERROR",
      };
    case "ANSWER":
      const isCorrect =
        state.questions[state.index].correctOption === action.payload;
      return {
        ...state,
        answer: action.payload,
        points: isCorrect
          ? state.points + state.questions[state.index].points
          : state.points,
      };
    case "NEXT_QUESTION":
      const hasAnswer = state.answer !== null;
      return {
        ...state,
        index: hasAnswer ? state.index + 1 : state.index,
        answer: hasAnswer ? null : state.answer,
      };
    case "SET_HIGHSCORE":
      const highScore =
        state.highestScore > action.payload
          ? state.highestScore
          : action.payload;
      return {
        ...state,
        highestScore: highScore,
      };
    case "RESULT":
      return {
        ...state,
        status: "FINISHED",
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, answer, points, highestScore } = state;
  useEffect(() => {
    async function getQuestions() {
      try {
        const response = await fetch("http://localhost:8000/questions");
        const data = await response.json();
        dispatch({ type: "DATA_RECEIVED", payload: data });
      } catch (error) {
        dispatch({ type: "DATA_FAILED" });
        console.error("ERROR(WHILE FETCH QUESTIONS): ", error);
      }
    }
    getQuestions();
  }, []);
  const numOfQuestions = questions.length;
  const totalPoints = questions.reduce((acc, question) => {
    return acc + question.points;
  }, 0);
  return (
    <div className="h-screen bg-darkest flex flex-col gap-8 items-center-safe">
      <Header />
      <Main>
        {status === "LOADING" && <Loader />}
        {status === "ERROR" && <Error />}
        {status === "READY" && (
          <StartScreen
            numOfQuestions={numOfQuestions}
            onStart={() => dispatch({ type: "START" })}
          />
        )}
        {status === "ACTIVE" && (
          <>
            <QuestionProgress
              totalQuestions={numOfQuestions}
              totalPoints={totalPoints}
              currentPoints={points}
              currentQuestion={index + 1}
            />
            <Question
              question={questions[index]}
              onSetAnswer={(answer: number) => {
                dispatch({ type: "ANSWER", payload: answer });
              }}
              onNextQuestion={() => {
                dispatch({ type: "NEXT_QUESTION" });
              }}
              currentAnswer={answer}
              isLast={index + 1 === numOfQuestions}
              onFinish={() => {
                dispatch({ type: "RESULT" });
                dispatch({ type: "SET_HIGHSCORE", payload: points });
              }}
            />
          </>
        )}
        {status === "FINISHED" && (
          <FinishScreen
            userPoints={points}
            totalPoints={totalPoints}
            highestScore={highestScore}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
