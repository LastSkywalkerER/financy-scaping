import { makeStyles } from '@core/hooks/customStyles';
import { ThemeOptions } from '@mui/material';

const useStyles = makeStyles((theme: ThemeOptions) => ({
  container: { width: '100%', height: '100%', padding: '10px' },
}));

export default useStyles;
