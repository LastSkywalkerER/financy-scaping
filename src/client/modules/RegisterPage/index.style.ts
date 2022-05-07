import { makeStyles } from '@core/hooks/customStyles';
import { ThemeOptions } from '@mui/material';

const useStyles = makeStyles((theme: ThemeOptions) => ({
  title: { textAlign: 'center' },
  card: {
    m: 'auto',
    mt: 10,
    width: 1 / 2,
    p: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardContent: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textField: { width: '100%', m: 3 },
  cardActions: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  },
}));

export default useStyles;
