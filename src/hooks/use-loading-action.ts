import { useState, useCallback } from "react";

export function useLoadingAction(action) {
  const [isLoading, setIsLoading] = useState(false);

  const run = useCallback(
    async (...args) => {
      if (isLoading) return; // evita doble ejecución
      setIsLoading(true);
      try {
        await action(...args);
      } finally {
        setIsLoading(false);
      }
    },
    [action, isLoading],
  );

  return { run, isLoading };
}
