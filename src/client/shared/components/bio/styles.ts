import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()({
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
