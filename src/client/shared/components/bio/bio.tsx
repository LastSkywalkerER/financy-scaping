import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@core/store/themeSlice';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useStyles } from '@components/bio/styles';
import { RootState } from '@core/store/store';
import { logout } from '@core/store/authSlice';

const avatar = 'https://random.imagecdn.app/50/50';

export default function Bio() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const userName = useSelector((state: RootState) => state.auth.data.name);
  const { classes } = useStyles();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const settings = [
    { name: 'Change Theme', onClick: () => dispatch(toggleTheme()) },
    { name: 'Logout', onClick: handleLogout },
  ];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickUserMenuItem = (callback: Function) => {
    callback();
    handleCloseUserMenu();
  };

  return (
    <Box className={classes.wrapper}>
      <Typography className={classes.textMargin}>
        Welcome, {userName}
      </Typography>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Avatar" src={avatar} />
        </IconButton>
      </Tooltip>
      <Menu
        className={classes.menu}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
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
              className={classes.text}
              onClick={handleClickUserMenuItem.bind(null, setting.onClick)}
              textAlign="center"
            >
              {setting.name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
