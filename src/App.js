import { useEffect, useState } from "react";

function App() {
  const [isSessoin, setIsSession] = useState(true);
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(1500);
  const [counter, setCounter] = useState(null);

  useEffect(() => {
    if (isRunning && !secondsLeft) {
      document.getElementById("beep").play();
      setTimeout(() => {
        setSecondsLeft(isSessoin ? breakLength * 60 : sessionLength * 60);
        setIsSession((prev) => !prev);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  useEffect(() => {
    if (!isRunning)
      setSecondsLeft(isSessoin ? sessionLength * 60 : breakLength * 60);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionLength, breakLength]);

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-3 text-center">
      <h1 className="mb-10 text-5xl font-bold">25 + 5 Clock</h1>
      <div className="mb-10 flex justify-evenly">
        {/* Session control */}
        <div className="w-32">
          <div className="mx-auto w-max rounded-t bg-gray-200 px-2 py-1 text-sm text-gray-600">
            <label id="session-label" htmlFor="session-length">
              Session length
            </label>
          </div>
          <div className="flex rounded font-mono text-xl">
            <button
              id="session-decrement"
              className="rounded-l"
              onClick={() => setSessionLength((prev) => Math.max(1, prev - 1))}
            >
              -
            </button>
            <div
              id="session-length"
              className="flex flex-1 items-center justify-center bg-gray-100"
            >
              {sessionLength}
            </div>
            <button
              id="session-increment"
              className="rounded-r"
              onClick={() => setSessionLength((prev) => Math.min(60, prev + 1))}
            >
              +
            </button>
          </div>
        </div>

        {/* Break control */}
        <div className="w-32">
          <div className="mx-auto w-max rounded-t bg-gray-200 px-2 py-1 text-sm text-gray-600">
            <label id="break-label" htmlFor="break-length">
              Break length
            </label>
          </div>
          <div className="flex rounded font-mono text-xl">
            <button
              id="break-decrement"
              className="rounded-l"
              onClick={() => setBreakLength((prev) => Math.max(1, prev - 1))}
            >
              -
            </button>
            <div
              id="break-length"
              className="flex flex-1 items-center justify-center bg-gray-100"
            >
              {breakLength}
            </div>
            <button
              id="break-increment"
              className="rounded-r"
              onClick={() => setBreakLength((prev) => Math.min(60, prev + 1))}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Timer */}
      <div className="flex flex-col items-center">
        <div className="mx-auto w-max rounded-t bg-gray-200 px-3 py-1 text-sm text-gray-600">
          <label id="timer-label" htmlFor="time-left">
            {isSessoin ? "Session" : "Break"}
          </label>
        </div>
        <div className="w-full rounded-xl bg-gray-100">
          <div className="flex">
            {/* Start/Stop */}
            <button
              id="start_stop"
              className={`flex-1 rounded-tl-xl py-4 ${
                isRunning
                  ? "bg-red-500 hover:bg-red-400 active:bg-red-600"
                  : "bg-green-600 hover:bg-green-500 active:bg-green-700"
              }`}
              onClick={() => {
                if (isRunning) clearInterval(counter);
                else {
                  setCounter(
                    setInterval(() => {
                      setSecondsLeft((prev) => Math.max(0, prev - 1));
                    }, 1000)
                  );
                }
                setIsRunning((prev) => !prev);
              }}
            >
              {isRunning ? "Stop" : "Start"}
            </button>

            {/* Reset */}
            <button
              id="reset"
              className="flex-1 rounded-tr-xl"
              onClick={() => {
                setIsSession(true);
                setIsRunning(false);
                clearInterval(counter);
                setSessionLength(25);
                setBreakLength(5);
                let audio = document.getElementById("beep");
                audio.pause();
                audio.currentTime = 0;
              }}
            >
              Reset
            </button>
          </div>

          <div id="time-left" className="py-8 font-mono text-6xl">
            {String(Math.floor(secondsLeft / 60)).padStart(2, "0")}
            {":"}
            {String(secondsLeft % 60).padStart(2, "0")}
          </div>
        </div>
        <audio
          id="beep"
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
    </div>
  );
}

export default App;
