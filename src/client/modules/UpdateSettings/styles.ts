import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(({ spacing }) => ({
  container: {
    paddingTop: spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));
