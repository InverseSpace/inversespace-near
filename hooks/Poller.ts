import { useEffect, useRef } from "react";

// Taken from austintgriffith/scaffold-eth
// helper hook to call a function regularly in time intervals

export default function usePoller(fn, delay, extraWatch) {
  const savedCallback = useRef();
  // Remember the latest fn.
  useEffect(() => {
    savedCallback.current = fn;
  }, [fn]);
  // Set up the interval.
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
  // run at start too
  useEffect(() => {
    fn();
  }, [extraWatch]);
}
