import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { getMainTableRequest } from '@/core/store/dataTableSlice'

import { StockTable } from './components/stockTable'
import { useStyles } from './styles'

export const MainAnalytics: React.FC = React.memo(() => {
  const { classes } = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMainTableRequest())
  }, [])

  return (
    <Box className={classes.container}>
      <StockTable />
    </Box>
  )
})
