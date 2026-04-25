import { useEffect, useState } from "react";

export function useTimer(
  timeInMinutes: number | null,
): [number, (arg: number) => void] {
  const [time, setTime] = useState(() => {
    return timeInMinutes !== null ? timeInMinutes : 0;
  });
  function decreaseTime() {
    setTime((prevTime) => prevTime - 1);
  }
  useEffect(() => {
    if (time === 0) return;

    const intervalId = setInterval(() => {
      decreaseTime();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [time]);
  return [time, setTime];
}
