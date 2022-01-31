import { makeStyles } from '@core/hooks/customStyles';

const useStyles = makeStyles({
  position: ({ message = [] }) => ({
    cursor: 'pointer',
    width: '50%',
    position: 'absolute',
    zIndex: '99',
    bottom: '85%',
    left: '50%',
    transform: 'translateX(-50%)',
    transition: '200ms',
    opacity: !message.length ? 0 : 1,
  }),
});

export default useStyles;
