import { useEffect, useCallback, useRef } from "react";

const useScrollDown = (
  callback: () => void,
  isLoading: boolean,
  hasMore: boolean
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isLoading && hasMore) {
        callback();
      }
    },
    [callback, isLoading, hasMore]
  );

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null, // Use viewport as root
      rootMargin: "1000px", // Trigger when 600px from the sentinel
      threshold: 0, // Trigger as soon as sentinel is visible
    });

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current && observerRef.current) {
        observerRef.current.unobserve(sentinelRef.current);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  return sentinelRef; // Return ref to attach to the sentinel element
};

export default useScrollDown;
