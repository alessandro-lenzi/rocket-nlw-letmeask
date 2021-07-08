import { useEffect, useRef } from "react";

export function usePrevious<T>(value:T) {
  const prevChildrenRef = useRef<T>();

  useEffect(() => {
    prevChildrenRef.current = value;
  }, [value]);

  return prevChildrenRef.current;
};

// https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
