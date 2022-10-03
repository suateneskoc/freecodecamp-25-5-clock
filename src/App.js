import { useState } from "react";

function App() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  return (
    <div className="mx-auto max-w-sm text-center">
      <h1>25 + 5 Clock</h1>
      <div className="flex justify-evenly">
        <div className="w-32">
          <div className="flex rounded font-mono text-xl">
            <button
              id="session-decrement"
              className="rounded-l"
              onClick={() => setSessionLength((prev) => prev - 1)}
            >
              -
            </button>
            <div
              id="session-length"
              className="flex flex-1 items-center justify-center bg-gray-200"
            >
              {sessionLength}
            </div>
            <button
              id="session-increment"
              className="rounded-r"
              onClick={() => setSessionLength((prev) => prev + 1)}
            >
              +
            </button>
          </div>
          <div className="mx-auto w-max rounded-b bg-gray-50 px-2 py-1 text-gray-600">
            <label id="session-label" htmlFor="session-length">
              Session length
            </label>
          </div>
        </div>
        <div className="w-32">
          <div className="flex rounded font-mono text-xl">
            <button
              id="break-decrement"
              className="rounded-l"
              onClick={() => setBreakLength((prev) => prev - 1)}
            >
              -
            </button>
            <div
              id="break-length"
              className="flex flex-1 items-center justify-center bg-gray-200"
            >
              {breakLength}
            </div>
            <button
              id="break-increment"
              className="rounded-r"
              onClick={() => setBreakLength((prev) => prev + 1)}
            >
              +
            </button>
          </div>
          <div className="mx-auto w-max rounded-b bg-gray-50 px-2 py-1 text-gray-600">
            <label id="break-label" htmlFor="break-length">
              Break length
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
