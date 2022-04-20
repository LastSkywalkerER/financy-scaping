import { makeStyles } from '@core/hooks/customStyles';
import { ThemeOptions } from '@mui/material';

const useStyles = makeStyles((theme: ThemeOptions) => ({
  appBar: {
    backgroundColor:
      theme.palette && theme.palette.primary
        ? theme.palette.primary.main
        : 'white',
  },
  barWrapper: { maxHeight: '65px' },
  mobileLogo: { mr: 2, display: { xs: 'none', md: 'flex' } },
  mobileMenuWrapper: { flexGrow: 1, display: { xs: 'flex', md: 'none' } },
  mobileMenu: {
    display: { xs: 'block', md: 'none' },
  },
  desktopLogo: { flexGrow: 1, display: { xs: 'flex', md: 'none' } },
  desktopMenuWrapper: { flexGrow: 1, display: { xs: 'none', md: 'flex' } },
  desktopMenuItem: { my: 2, color: 'white', display: 'block' },
}));

export default useStyles;
