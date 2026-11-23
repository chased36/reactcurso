import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Hook genérico para operaciones asíncronas.
 * Encapsula: loading, error, data, cancelación, reintento.
 *
 * @param {(signal: AbortSignal) => Promise<any>} asyncFn
 * @param {any[]} deps
 */
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
      if (!controller.signal.aborted && abortRef.current === controller) {
        setState({ data, loading: false, error: null });
      }
    } catch (err) {
      if (err.name === "AbortError") return; // cancelada a propósito
      if (!controller.signal.aborted && abortRef.current === controller) {
        setState({ data: null, loading: false, error: err });
      }
    }
  // Este hook recibe las dependencias explícitas de cada consumidor.
  // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/use-memo
  }, deps);

  useEffect(() => {
    run();
    return () => abortRef.current?.abort();
  }, [run]);

  const setData = useCallback((updater) => {
    setState((current) => ({
      ...current,
      data: typeof updater === "function" ? updater(current.data) : updater,
    }));
  }, []);

  return { ...state, recargar: run, setData };
}
