import React, { ReactElement } from 'react';
import { EditableCell } from '@components/editableCell';
import Token from 'src/types/Token';
import tickerManager from '@core/utilities/tickerManager';
import e from 'express';

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

    case 'price':
      if (row.status === 'ready') {
        return <div style={{ background: 'green' }}>{value}</div>;
      } else {
        value;
      }

    default:
      return value;
  }
};
