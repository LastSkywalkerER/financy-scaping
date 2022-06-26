import { Box } from '@mui/system'
import React from 'react'
import { useSelector } from 'react-redux'

import { TableUpdatingStatus } from '@/components/tableUpdatingStatus'
import { RootState } from '@/core/store/store'

import { useStyles } from './styles'

const Analytics: React.FC = React.memo(() => {
  const { classes } = useStyles()
  const { userId } = useSelector((state: RootState) => state.auth.data)

  return (
    <Box className={classes.container}>
      <a href={`https://t.me/FinancyScrapingBot?start=${userId}`}>Link to tg</a>
      <TableUpdatingStatus />
    </Box>
  )
})

export default Analytics
