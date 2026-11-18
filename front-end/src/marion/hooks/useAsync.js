import { useCallback, useEffect, useRef, useState } from "react";


export function useAsync(asyncFn, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const abortRef = useRef(null);

  const run = useCallback(async () => {
    abortRef.current?.abort(); 
    const controller = new AbortController();
    abortRef.current = controller;

    setState((s) => ({ ...s, loading: true, error: null }));

    try {
      const data = await asyncFn(controller.signal);
      if (abortRef.current === controller) {
        setState({ data, loading: false, error: null });
      }
    } catch (err) {
      if (err.name === "AbortError") return; 
      if (abortRef.current === controller) {
        setState({ data: null, loading: false, error: err });
      }
    }
  }, deps);

  useEffect(() => {
    run();
    return () => abortRef.current?.abort(); 
  }, [run]);

  return { ...state, recargar: run };
}