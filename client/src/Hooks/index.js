import { useEffect, useRef, useState } from 'react';

export const useInfiniteScroll = () => {
  const [page, setPage] = useState(0);
  const loaderRef = useRef(null);
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };
    const handleObserver = (entities) => {
      const target = entities[0];
      if (target.isIntersecting) {
        if (page === -1) {
          observer.disconnect();
        }
        setPage((page) => page + 1);
      }
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [loaderRef, page, setPage];
};
