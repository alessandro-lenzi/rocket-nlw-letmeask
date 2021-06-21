import { useState } from "react";

export function CounterButton() {
  // let counter = 0;
  const [counter, setCounter] = useState(0);

  function increment() {
    setCounter(counter + 1);
  }

  return (
    <button onClick={increment}>
      {counter}
    </button>
  );
}
