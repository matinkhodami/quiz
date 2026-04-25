import { useEffect, useReducer } from "react";
import Header from "./components/header";
import Main from "./components/main";
import Loader from "./components/loader";
import Error from "./components/error";
import { StartScreen } from "./components/start-screen";
import { Question } from "./components/question";

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
  | { type: "ANSWER"; payload: number };

interface StateType {
  questions: Question[];
  status: "LOADING" | "ERROR" | "READY" | "ACTIVE" | "FINISHED";
  index: number;
  answer: number | null;
}
const initialState: StateType = {
  questions: [],
  status: "LOADING",
  index: 0,
  answer: null,
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
      return {
        ...state,
        answer: action.payload,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, answer } = state;
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
          <Question
            question={questions[index]}
            onSetAnswer={(answer: number) => {
              dispatch({ type: "ANSWER", payload: answer });
            }}
            currentAnswer={answer}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
