import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { getSavedTickersRequest } from '@/core/store/savedTickersSlice'

import { SavedTable } from './components/savedTable'
import { useStyles } from './styles'

export const SavedAnalytics: React.FC = React.memo(() => {
  const { classes } = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSavedTickersRequest())
  }, [])

  return (
    <Box className={classes.container}>
      <SavedTable />
    </Box>
  )
})
