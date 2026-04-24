import { useEffect, useReducer, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";

interface Question {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}
type Action =
  | { type: "RESET" }
  | { type: "DATA_RECEIVED"; payload: Question[] }
  | { type: "DATA_FAILED" };

interface StateType {
  questions: Question[];
  status: "LOADING" | "ERROR" | "READY" | "ACTIVE" | "FINISHED";
}
const initialState: StateType = {
  questions: [],
  status: "LOADING",
};

function reducer(state: StateType, action: Action): StateType {
  switch (action.type) {
    case "DATA_RECEIVED":
      return {
        questions: action.payload,
        status: "READY",
      };
    case "DATA_FAILED":
      return {
        ...state,
        status: "ERROR",
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status } = state;
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
  const totalQuestions = questions.length;
  return (
    <div className="flex flex-col justify-center-safe items-center-safe">
      <Header />
      <Main>
        <p>1/{totalQuestions}</p>
        <p>Question</p>
      </Main>
    </div>
  );
}

export default App;
