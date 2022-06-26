import { Box } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Header from '@/components/header/header'
import AppRoutes from '@/components/router/routes'
import UserMessage from '@/components/userMessage'

import { useStyles } from './styles'

export const AppWrapper: React.FC = () => {
  const [hederHeight, setHeaderHeight] = useState(0)
  const { classes } = useStyles()
  const headerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight)
    }
  }, [headerRef.current])

  return (
    <Router>
      <Header ref={headerRef} />
      <Box sx={{ height: `calc(100% - ${hederHeight}px)` }} className={classes.wrapper}>
        <AppRoutes />
      </Box>
      <UserMessage />
    </Router>
  )
}
