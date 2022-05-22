import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()({
  wrapper: {
    flexGrow: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textMargin: { marginRight: 3 },
  menu: { marginTop: '50px' },
});
