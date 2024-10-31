import { useState, useEffect, useRef } from 'react';

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (time: number) => {
    const milliseconds = (time % 1000).toString().padStart(3, '0');
    const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, '0');
    const minutes = Math.floor((time / 60000) % 60).toString().padStart(2, '0');

    return `${minutes}:${seconds}.${milliseconds}`;
  };

  return (
    <div>
      <p>{formatTime(time)}</p>
      <button onClick={handleStart} disabled={isRunning}>Start</button>
      <button onClick={handleStop} disabled={!isRunning}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default Stopwatch;