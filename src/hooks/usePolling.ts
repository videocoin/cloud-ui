import { useCallback, useEffect, useRef } from 'react';
import { workersRequestTimeout } from 'const';

function usePolling(fn: (v: any) => void) {
  const timer = useRef<number>();
  const startPoll = useCallback(
    (timeout: number) => {
      timer.current = (setTimeout(async () => {
        try {
          fn({ silent: true });
        } finally {
          startPoll(workersRequestTimeout);
        }
      }, timeout) as unknown) as number;
    },
    [fn],
  );

  useEffect(() => {
    startPoll(0);

    return () => {
      clearTimeout(timer.current);
    };
  }, [startPoll]);
}

export default usePolling;
