import Header from '@components/header/header';
import AppRoutes from '@components/router/routes';
import UserMessage from '@components/userMessage';
import { Box } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Props } from './types';

export const AppWrapper: React.FC = () => {
  const [hederHeight, setHeaderHeight] = useState(0);

  const headerRef = useRef() as React.RefObject<HTMLDivElement>;

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }
  }, [headerRef.current]);

  return (
    <Router>
      <Header ref={headerRef} />
      <Box sx={{ height: `calc(100% - ${hederHeight}px)` }}>
        <AppRoutes />
      </Box>
      <UserMessage />
    </Router>
  );
};
