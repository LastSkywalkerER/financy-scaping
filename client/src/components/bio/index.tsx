import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useStyles } from '@/components/bio/styles'
import { logout } from '@/core/store/authSlice'
import { RootState } from '@/core/store/store'
import { toggleTheme } from '@/core/store/themeSlice'

const avatar = 'https://random.imagecdn.app/50/50'

export const Bio: React.FC = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const userName = useSelector((state: RootState) => state.auth.data.name)
  const { classes } = useStyles()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  const settings = [
    { name: 'Change Theme', onClick: () => dispatch(toggleTheme()) },
    { name: 'Logout', onClick: handleLogout },
  ]

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleClickUserMenuItem = (callback: () => void) => {
    callback()
    handleCloseUserMenu()
  }

  return (
    <Box className={classes.wrapper}>
      <Typography className={classes.textMargin}>Welcome, {userName}</Typography>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Avatar" src={avatar} />
        </IconButton>
      </Tooltip>
      <Menu
        className={classes.menu}
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting.name}>
            <Typography
              onClick={handleClickUserMenuItem.bind(null, setting.onClick)}
              textAlign="center"
            >
              {setting.name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}
