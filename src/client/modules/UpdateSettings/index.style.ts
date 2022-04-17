import { makeStyles } from '@core/hooks/customStyles';
import { ThemeOptions } from '@mui/material';

const useStyles = makeStyles((theme: ThemeOptions) => ({
  container: {
    paddingTop: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default useStyles;
