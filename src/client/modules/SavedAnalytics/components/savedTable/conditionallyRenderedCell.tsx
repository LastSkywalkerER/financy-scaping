import React, { createElement, ReactElement } from 'react';
import { EditableCell } from '@components/editableCell';

export const conditionallyRenderedCell = (
  column: string,
  value: any,
): ReactElement | string | null | number => {
  const handleApply = (newValue: string | null | number) => {
    console.log(
      '🚀 ~ file: conditionallyRenderedCell.tsx ~ line 9 ~ handleApply ~ newValue',
      newValue,
    );
  };

  switch (column) {
    case 'expectedPrice':
      return <EditableCell value={value} onApply={handleApply} />;

    default:
      return value;
  }
};
