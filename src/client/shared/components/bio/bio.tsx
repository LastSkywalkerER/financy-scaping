import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { toggleTheme } from '@core/store/themeSlice';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import useStyles from '@components/bio/bioStyle';
import { useAuth } from '@core/hooks/useAuth';

const avatar = 'https://random.imagecdn.app/50/50';

export default function Bio() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const userName = useSelector((state: RootStateOrAny) => state.userName.value);
  const { wrapper, textMargin, menu, text } = useStyles();
  const { logout } = useAuth();
  const settings = [
    { name: 'Change Theme', onClick: () => dispatch(toggleTheme()) },
    { name: 'Logout', onClick: logout },
  ];

  const dispatch = useDispatch();

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
    <Box sx={wrapper}>
      <Typography sx={textMargin}>Welcome, {userName}</Typography>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src={avatar} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={menu}
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
              sx={text}
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
