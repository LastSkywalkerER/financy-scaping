import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(() => ({
  position: {
    cursor: 'pointer',
    width: '300px',
    position: 'absolute',
    zIndex: '99',
    bottom: '50px',
    right: '50px',
    transition: '200ms',
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
}));
