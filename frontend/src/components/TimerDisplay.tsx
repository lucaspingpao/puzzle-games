import { useMemo } from "react"

interface TimerDisplayProps {
    time: number
}

function TimerDisplay(props: TimerDisplayProps) {

  const minutes = useMemo(() => Math.floor((props.time / 1000) / 60), [props.time]);
  const seconds = useMemo(() => Math.floor((props.time / 1000) % 60), [props.time]);
  const milliseconds = useMemo(() => Math.floor((props.time % 1000) / 10), [props.time]);

  return (
    <div className="my-4">
      <h1>
        Time: {minutes < 10 ? minutes : String(minutes).padStart(2, '0')}:
        {String(seconds).padStart(2, '0')}.
        {String(milliseconds).padStart(2, '0')}
      </h1>
    </div>
  );
};

export default TimerDisplay