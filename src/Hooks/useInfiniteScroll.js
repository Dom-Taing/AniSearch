import { useCallback, useEffect, useRef, useState } from "react";

export function useInfiniteScroll(
  fetcher,
  combiner = (prev, curr) => {
    return [...prev, ...curr];
  }
) {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const lastEle = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleFetch = async () => {
      try {
        setLoading(true);
        const data = await fetcher(page);
        setItems((prev) => {
          return combiner(prev, data);
        });
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    };
    handleFetch();
  }, [page]);

  const handleObserver = useCallback((entries) => {
    const entry = entries[0];
    // console.log(entry);
    if (entry.isIntersecting && entry.intersectionRatio > 0) {
      console.log("next page please");
      setPage((prev) => {
        return prev + 1;
      });
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };

    console.log("new observer created");
    const observer = new IntersectionObserver(handleObserver, option);
    if (lastEle.current) observer.observe(lastEle.current);
  }, [lastEle.current, handleObserver]);

  useEffect(
    () => console.log("last Element", lastEle),
    [lastEle.current, lastEle]
  );

  return {
    items: items,
    loading: loading,
    error: error,
    lastItemsRef: lastEle,
    containerRef: containerRef,
  };
}
