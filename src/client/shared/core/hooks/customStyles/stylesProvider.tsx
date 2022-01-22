import { ThemeOptions } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomStyles from './CustomStyles';
import globalStyles from './globalStyles';
import { ContextStyles } from './types';

interface Props {
  children: JSX.Element | JSX.Element[];
  theme: ThemeOptions;
}

export default React.memo(({ children, theme }: Props) => {
  const [styles, setStyles] = useState([] as ContextStyles[]);

  useEffect(() => {
    let style: ContextStyles[] = [];

    globalStyles.forEach((globalStyle) => {
      if (typeof globalStyle === 'function') {
        style.push(globalStyle(theme));
      } else if (typeof globalStyle === 'object') {
        style.push(globalStyle);
      }
    });

    setStyles(style);
  }, [theme]);

  return (
    <CustomStyles.Provider value={styles}>{children}</CustomStyles.Provider>
  );
}) as React.FC<Props>;
