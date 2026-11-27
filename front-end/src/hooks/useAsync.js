import { useCallback, useEffect, useRef, useState } from "react";

export function useAsync(asyncFn, deps = []) {
  const depsKey = JSON.stringify(deps);
  const [reloadTick, setReloadTick] = useState(0);
  const requestKey = `${depsKey}-${reloadTick}`;

  const [state, setState] = useState({
    key: requestKey,
    data: null,
    loading: true,
    error: null,
  });

  const asyncFnRef = useRef(asyncFn);

  useEffect(() => {
    asyncFnRef.current = asyncFn;
  });

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    Promise.resolve()
      .then(() => asyncFnRef.current(controller.signal))
      .then(
        (data) => {
          if (active) {
            setState({ key: requestKey, data, loading: false, error: null });
          }
        },
        (err) => {
          if (err?.name === "AbortError") return;
          if (active) {
            setState({ key: requestKey, data: null, loading: false, error: err });
          }
        }
      );

    return () => {
      active = false;
      controller.abort();
    };
  }, [requestKey]);

  const recargar = useCallback(() => {
    setReloadTick((t) => t + 1);
  }, []);

  const isStale = state.key !== requestKey;

  return {
    data: isStale ? null : state.data,
    loading: isStale ? true : state.loading,
    error: isStale ? null : state.error,
    recargar,
  };
}
