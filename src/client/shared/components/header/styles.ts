import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(({ palette, breakpoints, spacing }) => ({
  linkStyle: {
    textTransform: 'none',
    color: palette.primary.contrastText,
  },
  appBar: {
    backgroundColor: `${palette.primary.main} !important`,
  },
  barWrapper: { maxHeight: '65px' },
  mobileLogo: {
    marginRight: spacing(2),
    [breakpoints.up('xs')]: {
      display: 'none',
    },
    [breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  mobileMenuWrapper: {
    flexGrow: 1,
    [breakpoints.up('xs')]: {
      display: 'flex',
    },
    [breakpoints.up('md')]: {
      display: 'none',
    },
  },
  mobileMenu: {
    [breakpoints.up('xs')]: {
      display: 'block',
    },
    [breakpoints.up('md')]: {
      display: 'none',
    },
  },
  desktopLogo: {
    flexGrow: 1,
    [breakpoints.up('xs')]: {
      display: 'flex',
    },
    [breakpoints.up('md')]: {
      display: 'none',
    },
  },
  desktopMenuWrapper: {
    flexGrow: 1,
    padding: `0 ${spacing(5)}`,
    [breakpoints.up('xs')]: {
      display: 'none',
    },
    [breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  desktopMenuItem: { my: 2, color: 'white', display: 'block' },
}));
