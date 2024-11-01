import { useState, useRef, useEffect } from "react";

interface TimerHook {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

function useTimer(): TimerHook {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current as NodeJS.Timeout);
      intervalRef.current = null;
    }

    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, [isRunning]);

  return { time, setTime, isRunning, setIsRunning };
}

export default useTimer;