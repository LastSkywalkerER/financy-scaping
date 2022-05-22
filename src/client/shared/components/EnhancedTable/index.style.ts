import { makeStyles } from '@core/hooks/customStyles';
import { ThemeOptions } from '@mui/material';

const useStyles = makeStyles((theme: ThemeOptions) => ({
  container: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  tableContainer: { height: '100%' },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: `1px solid ${theme.palette?.divider}`,
  },
}));

export default useStyles;
