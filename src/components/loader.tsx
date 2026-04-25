export default function Loader() {
  return (
    <>
      <div className="flex gap-2 justify-center items-center">
        {Array.from({ length: 4 }, (_, bar) => (
          <div
            key={bar}
            className="w-3 h-3 bg-rose-500 rounded-full"
            style={{
              animation: `bounce 1s ease-in-out ${bar * 0.15}s infinite`,
            }}
          />
        ))}
      </div>
      <h1 className="text-center mt-3! text-medium font-bold">Loading...</h1>
    </>
  );
}
