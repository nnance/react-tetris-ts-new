import { useRef, useEffect } from "react";

type Callback = () => void;

export default function useInterval(cb: Callback, delay: number): void {
  const savedCallback = useRef<Callback>(cb);

  useEffect(() => {
    function tick(): void {
      savedCallback.current && savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return (): void => clearInterval(id);
    }
  }, [delay]);
}
