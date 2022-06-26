import { Box, Button, Typography } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useWebSocket, WSSubscriber } from '@/core/hooks/useWebSocket'
import { messageOccurred } from '@/core/store/userMessageSlice'
import { wsPackageTypes } from '@/types/wsPackageTypes'

export const TableUpdatingStatus: FC = () => {
  const [tableUpdating, setTableUpdating] = useState({
    status: false,
    tickerCount: 0,
    tickerUpdated: 0,
  })

  const dispatch = useDispatch()
  const { sendMessage, subscribe, unsubscribe, status } = useWebSocket()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wsSubscription: WSSubscriber = ({ type, data }) => {
    switch (type) {
      case wsPackageTypes.TABLE_UPDATE_STATUS:
        setTableUpdating(data)
        break

      case wsPackageTypes.TABLE_UPDATE_REQUEST:
        dispatch(messageOccurred({ type: 'success', message: 'Begin updating' }))
        setTableUpdating(data)
        break

      default:
        break
    }
  }

  useEffect(() => {
    subscribe(wsSubscription)
    sendMessage({ type: wsPackageTypes.TABLE_UPDATE_STATUS })

    return () => unsubscribe(wsSubscription)
  }, [])

  const handleUpdateTable = async () => {
    sendMessage({ type: wsPackageTypes.TABLE_UPDATE_REQUEST })
  }

  const handleStopUpdating = () => {
    sendMessage({ type: wsPackageTypes.TABLE_STROP_UPDATE_REQUEST })
  }

  return (
    <Box>
      {tableUpdating.status ? (
        <Button disabled={!tableUpdating.status} onClick={handleStopUpdating} variant="contained">
          Stop updating
        </Button>
      ) : (
        <Button disabled={tableUpdating.status} onClick={handleUpdateTable} variant="contained">
          Update table
        </Button>
      )}
      <Typography>
        {tableUpdating.status
          ? `Updating ${Math.round(
              (tableUpdating.tickerUpdated / tableUpdating.tickerCount) * 100,
            )}%`
          : `Latest ${tableUpdating.tickerCount} tickers`}
      </Typography>
    </Box>
  )
}
