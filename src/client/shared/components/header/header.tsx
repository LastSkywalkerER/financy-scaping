import React from 'react';
import { Link } from 'react-router-dom';
import Bio from '../bio/bio';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@emotion/react';
import { ThemeOptions } from '@mui/material/styles';
import useStyles from './headerStyle';

import { RootStateOrAny, useSelector } from 'react-redux';
import { RootState } from '@core/store/store';

const pages = [
  { name: 'Main analytics', route: '/mainAnalytics' },
  { name: 'Saved analytics', route: '/savedAnalytics' },
  { name: 'Settings', route: '/updateSettings' },
];

const authLinks = [
  { name: 'Login', route: '/loginPage' },
  { name: 'Register', route: '/registerPage' },
];

export default function Header(): JSX.Element {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const { token } = useSelector((state: RootState) => state.auth.data);
  const isAuth = Boolean(token);
  const {
    appBar,
    barWrapper,
    mobileLogo,
    mobileMenuWrapper,
    mobileMenu,
    desktopLogo,
    desktopMenuWrapper,
    desktopMenuItem,
    linkStyle,
  } = useStyles();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={appBar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={barWrapper}>
          <Typography variant="h6" noWrap component="div" sx={mobileLogo}>
            SMA app
          </Typography>

          <Box sx={mobileMenuWrapper}>
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
              sx={mobileMenu}
            >
              {(isAuth ? pages : authLinks).map((link) => (
                <MenuItem key={link.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link style={linkStyle} to={link.route}>
                      {link.name}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography variant="h6" noWrap component="div" sx={desktopLogo}>
            SMA app
          </Typography>

          <Box sx={desktopMenuWrapper}>
            {(isAuth ? pages : authLinks).map((link) => (
              <Button
                key={link.name}
                onClick={handleCloseNavMenu}
                sx={desktopMenuItem}
              >
                <Link style={linkStyle} to={link.route}>
                  {link.name}
                </Link>
              </Button>
            ))}
          </Box>

          {isAuth ? <Bio /> : null}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
