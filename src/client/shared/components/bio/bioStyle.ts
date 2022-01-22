import { makeStyles } from '@core/hooks/customStyles';

const useStyles = makeStyles({
  wrapper: {
    flexGrow: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textMargin: { mr: 3 },
  menu: { mt: '50px' },
  text: { width: '100%' },
});

export default useStyles;
