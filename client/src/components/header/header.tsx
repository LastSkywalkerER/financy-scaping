import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import React, { ForwardedRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { RootState } from '@/core/store/store'

import { Bio } from '../bio'
import { useStyles } from './styles'

const pages = [
  { name: 'Main analytics', route: '/mainAnalytics' },
  { name: 'Saved analytics', route: '/savedAnalytics' },
  { name: 'Settings', route: '/updateSettings' },
]

const authLinks = [
  { name: 'Login', route: '/loginPage' },
  { name: 'Register', route: '/registerPage' },
]

const Header = (props: unknown, ref: ForwardedRef<HTMLDivElement | null>) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const { token } = useSelector((state: RootState) => state.auth.data)
  const isAuth = Boolean(token)
  const { classes } = useStyles()

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppBar ref={ref} position="static" className={classes.appBar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters className={classes.barWrapper}>
          <Typography variant="h6" noWrap component="div" className={classes.mobileLogo}>
            SMA app
          </Typography>

          <Box className={classes.mobileMenuWrapper}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              className={classes.mobileMenu}
            >
              {(isAuth ? pages : authLinks).map((link) => (
                <MenuItem key={link.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link className={classes.linkStyle} to={link.route}>
                      {link.name}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography variant="h6" noWrap component="div" className={classes.desktopLogo}>
            SMA app
          </Typography>

          <Box className={classes.desktopMenuWrapper}>
            {(isAuth ? pages : authLinks).map((link) => (
              <Button
                key={link.name}
                onClick={handleCloseNavMenu}
                className={classes.desktopMenuItem}
              >
                <Link className={classes.linkStyle} to={link.route}>
                  {link.name}
                </Link>
              </Button>
            ))}
          </Box>

          {isAuth ? <Bio /> : null}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default React.memo(React.forwardRef(Header))
