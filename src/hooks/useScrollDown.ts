import { useEffect, useCallback } from "react";

const useScrollDown = (
  callback: () => void,
  isLoading: boolean,
  hasMore: boolean
) => {
  const handleScroll = useCallback(() => {
    if (isLoading || !hasMore) return;

    // Check if user is neare the bottom of the page
    const scrollPosition = window.innerHeight + window.scrollY;
    const bottomPosition = document.documentElement.offsetHeight - 3840; // Trigger 100px before bottom

    if (scrollPosition >= bottomPosition) {
      callback();
    }
  }, [callback, isLoading, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
};

export default useScrollDown;
