import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(({ palette }) => ({
  wrapper: {
    backgroundColor: `${palette.background.default} !important`,
  },
}));
