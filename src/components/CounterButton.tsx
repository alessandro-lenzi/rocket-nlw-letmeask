import { useEffect, useState } from "react";

export function CounterButton() {
  const [counter, setCounter] = useState(0);

  function increment() {
    setCounter(counter + 1);
  }

  useEffect(() => {
    console.log(counter);
  }, [counter]);

  return (
    <button onClick={increment}>
      {counter}
    </button>
  );
}
