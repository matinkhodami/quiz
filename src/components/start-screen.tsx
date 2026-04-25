interface Props {
  numOfQuestions: number;
  onStart: () => void;
}
export function StartScreen({ numOfQuestions, onStart }: Props) {
  return (
    <div className="flex flex-col gap-6 border-t pt-6! text-center text-medium">
      <h1 className="font-semibold text-4xl">Welcome To The React Quiz...</h1>
      <p className="text-2xl">
        {numOfQuestions} question to test your React mastery
      </p>
      <button
        className="bg-dark mx-auto! px-8! py-4! inset-shadow-sm inset-shadow-medium/10 font-bold text-2xl rounded-full cursor-pointer transition-all duration-150 outline-0 border-0  hover:scale-105 hover:bg-darkest hover:border-3 hover:border-medium/50"
        onClick={onStart}
      >
        Let's start
      </button>
    </div>
  );
}
