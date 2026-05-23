import React, { useEffect, useState } from "react";

function Counter({ repeatNumber, resetKey }) {
  const initialCount = Number(repeatNumber) || 0;
  const [count, setCount] = useState(initialCount);
  const isDone = count === 0;

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount, resetKey]);

  return (
    <>
      <button
        type="button"
        onClick={() => setCount((currentCount) => Math.max(currentCount - 1, 0))}
        aria-label={isDone ? "تم إكمال الذكر" : `باقي ${count}`}
        className={`adkar-counter ${isDone ? "adkar-counter-done" : "adkar-counter-active"}`}
      >
        {isDone ? <i className="bi bi-check-lg"></i> : count}
      </button>
      <button
        type="button"
        onClick={() => setCount(initialCount)}
        aria-label="إعادة ضبط العداد"
        className="adkar-counter-reset"
      >
        <i className="bi bi-arrow-counterclockwise"></i>
      </button>
    </>
  );
}

export default Counter;
