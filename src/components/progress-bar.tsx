import { useState, useEffect } from "react";

interface Props {
  numerator: number;
  denominator: number;
}

export function ProgressBar({ numerator, denominator }: Props) {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const calculatedPercentage = (numerator / denominator) * 100;
    const boundedPercentage = Math.min(100, Math.max(0, calculatedPercentage));
    setPercentage(boundedPercentage);
  }, [numerator, denominator]);

  return (
    <div className="w-full p-2! my-1!">
      <div className="text-center mb-2 text-gray-700">
        {numerator} / {denominator}
      </div>

      <div className="w-full bg-dark rounded-full h-4 overflow-hidden">
        <div
          className="bg-medium h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
