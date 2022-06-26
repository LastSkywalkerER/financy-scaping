import React, { ReactElement } from 'react'
import { useDispatch } from 'react-redux'

import { EditableCell } from '@/components/editableCell'
import { updateSavedTickersRequest } from '@/core/store/savedTickersSlice'
import Token from '@/types/Token'

export const ConditionallyRenderedCell = (
  column: string,
  value: any,
  imdex: number,
  row: Token,
): ReactElement | string | null | number => {
  const dispatch = useDispatch()

  const handleApply = (newValue: string | null | number) => {
    if (newValue && !isNaN(Number(newValue))) {
      dispatch(
        updateSavedTickersRequest({
          ticker: row,
          expectedPrice: Number(newValue),
        }),
      )
    }
  }

  switch (column) {
    case 'expectedPrice':
      return <EditableCell value={value} onApply={handleApply} />

    case 'price':
      if (row.status === 'ready') {
        return <div style={{ background: 'green' }}>{value}</div>
      } else {
        return value
      }

    default:
      return value
  }
}
