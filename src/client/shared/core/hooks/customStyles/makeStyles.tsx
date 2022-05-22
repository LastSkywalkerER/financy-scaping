import { SxProps, Theme, ThemeOptions } from '@mui/system';
import React, { useCallback, useContext, useMemo } from 'react';
import CustomStyles from './CustomStyles';
import globalStyles from './globalStyles';
import {
  DefaultStyle,
  FinishStyles,
  FunctionalStyle,
  GlobalStyles,
} from './types';

export default <T extends {}>(styles: any) => {
  globalStyles.push(styles);
  const index = globalStyles.length - 1;
  return (props?: T) => {
    const currentStyle = useContext(CustomStyles)[index] || {};
    let newStyle: FinishStyles = {};

    Object.keys(currentStyle).forEach((key) => {
      if (typeof currentStyle[key] === 'function') {
        newStyle[key] = (currentStyle[key] as FunctionalStyle)(props);
      } else if (typeof currentStyle[key] === 'object') {
        newStyle[key] = currentStyle[key] as DefaultStyle;
      }
      return {};
    });

    return newStyle;
  };
};
