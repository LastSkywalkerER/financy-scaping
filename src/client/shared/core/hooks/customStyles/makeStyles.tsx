import React, { useCallback, useContext, useMemo } from 'react';
import CustomStyles from './CustomStyles';
import globalStyles from './globalStyles';
import { DefaultStyle, FinishStyles, FunctionalStyle } from './types';

export default (styles: any) => {
  globalStyles.push(styles);
  const index = globalStyles.length - 1;
  return (props?: any) => {
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
