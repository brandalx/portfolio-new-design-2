import { useEffect, useCallback, useRef } from "react";

const useScrollDown = (
  callback: () => void,
  isLoading: boolean,
  hasMore: boolean
) => {
  const lastCalled = useRef(0);

  const handleScroll = useCallback(() => {
    if (isLoading || !hasMore) return;

    const now = Date.now();
    const scrollPosition = window.innerHeight + window.scrollY;
    const bottomPosition = document.documentElement.offsetHeight - 100;

    // 1. Throttle: Only allow callback every 700ms
    // 2. Trigger only if near bottom
    if (scrollPosition >= bottomPosition && now - lastCalled.current > 2000) {
      lastCalled.current = now;
      callback();
    }
  }, [callback, isLoading, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
};

export default useScrollDown;
