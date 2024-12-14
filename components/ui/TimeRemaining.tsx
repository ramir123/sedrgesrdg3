import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

interface TimeRemainingProps {
  endTime: number;
  onComplete?: () => void;
}

export function TimeRemaining({ endTime, onComplete }: TimeRemainingProps) {
  const [timeLeft, setTimeLeft] = useState(endTime);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = endTime - Date.now();
      if (newTimeLeft <= 0) {
        clearInterval(timer);
        onComplete?.();
      }
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, onComplete]);

  if (timeLeft <= 0) {
    return <span className="text-green-500">Completed</span>;
  }

  return (
    <span className="text-blue-500">
      {formatDistanceToNow(new Date(endTime), { addSuffix: true })}
    </span>
  );
}