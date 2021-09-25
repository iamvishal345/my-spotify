import React from 'react';
import { useLocation } from 'react-router';

const ScrollToTop = () => {
  const location = useLocation();
  React.useEffect(() => window.scrollTo(0, 0), [location.pathname]);
  return '';
};

export default ScrollToTop;
