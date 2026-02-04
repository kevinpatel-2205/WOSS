import { useRef, useState } from "react";

function Timer() {
  const timerRef = useRef<number | null>(null);
  const [seconds, setSeconds] = useState<number>(0);

  const startTimer = () => {
    if (timerRef.current !== null) return;

    timerRef.current = window.setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetTimer = () => {
    stopTimer();
    setSeconds(0);
  };

  // Format time → MM:SS
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-400">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20 w-80 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">⏱️ Timer</h1>

        {/* Time Display */}
        <div className="text-5xl font-mono text-white mb-6">
          {String(minutes).padStart(2, "0")}:
          {String(remainingSeconds).padStart(2, "0")}
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={startTimer}
            className="px-5 py-2 rounded-lg bg-green-500 text-white font-semibold
                       hover:bg-green-600 active:scale-95 transition"
          >
            Start
          </button>

          <button
            onClick={stopTimer}
            className="px-5 py-2 rounded-lg bg-yellow-500 text-white font-semibold
                       hover:bg-yellow-600 active:scale-95 transition"
          >
            Stop
          </button>

          <button
            onClick={resetTimer}
            className="px-5 py-2 rounded-lg bg-red-500 text-white font-semibold
                       hover:bg-red-600 active:scale-95 transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Timer;
