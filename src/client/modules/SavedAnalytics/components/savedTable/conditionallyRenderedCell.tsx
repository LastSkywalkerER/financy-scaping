import React, { ReactElement } from 'react';
import { EditableCell } from '@components/editableCell';
import Token from 'src/types/Token';
import tickerManager from '@core/utilities/tickerManager';

export const conditionallyRenderedCell = (
  column: string,
  value: any,
  imdex: number,
  row: Token,
): ReactElement | string | null | number => {
  const { updateTicker } = tickerManager();

  const handleApply = (newValue: string | null | number) => {
    if (newValue && !isNaN(Number(newValue))) {
      updateTicker(row, Number(newValue));
    }
  };

  switch (column) {
    case 'expectedPrice':
      return <EditableCell value={value} onApply={handleApply} />;

    default:
      return value;
  }
};
