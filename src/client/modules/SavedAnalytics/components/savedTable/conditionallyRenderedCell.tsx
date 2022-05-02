import React, { ReactElement } from 'react';
import { EditableCell } from '@components/editableCell';
import Token from 'src/types/Token';
import e from 'express';
import { useDispatch } from 'react-redux';
import { updateSavedTickersRequest } from '@core/store/savedTickersSlice';

export const conditionallyRenderedCell = (
  column: string,
  value: any,
  imdex: number,
  row: Token,
): ReactElement | string | null | number => {
  const dispatch = useDispatch();

  const handleApply = (newValue: string | null | number) => {
    if (newValue && !isNaN(Number(newValue))) {
      dispatch(
        updateSavedTickersRequest({
          ticker: row,
          expectedPrice: Number(newValue),
        }),
      );
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
