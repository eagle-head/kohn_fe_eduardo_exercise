// src/hooks/useDebounce.ts
import * as React from 'react';

type DebounceOptions = {
  value?: string;
  delay?: number;
};

export function useDebounce({ value = '', delay = 500 }: DebounceOptions) {
  const [debouncedValue, setDebouncedValue] = React.useState<string>(value);
  const handlerRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    handlerRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (handlerRef.current) {
        clearTimeout(handlerRef.current);
      }
    };
  }, [value, delay]);

  return { debouncedValue };
}
