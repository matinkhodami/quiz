interface Props {
  numOfQuestions: number;
  onStart: () => void;
}
export function StartScreen({ numOfQuestions, onStart }: Props) {
  return (
    <div className="flex flex-col gap-2 border-t pt-6! text-center text-medium">
      <h1 className="font-semibold text-2xl">Welcome To The React Quiz...</h1>
      <p className="text-xl">
        {numOfQuestions} question to test your React mastery
      </p>
      <button
        className="bg-dark mt-6! mx-auto! px-6! py-3! inset-shadow-sm inset-shadow-medium/10 font-bold text-xl rounded-full cursor-pointer transition-all duration-150 outline-0 border-0  hover:scale-105 hover:bg-darkest hover:border-3 hover:border-medium/50"
        onClick={onStart}
      >
        Let's start
      </button>
    </div>
  );
}
