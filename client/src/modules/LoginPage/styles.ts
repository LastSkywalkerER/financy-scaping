import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(({ spacing }) => ({
  title: { textAlign: 'center' },
  card: {
    margin: 'auto',
    marginTop: spacing(10),
    width: '50%',
    maxWidth: '600px',
    padding: spacing(3),
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
  textField: { width: '100%', margin: `${spacing(2)} !important` },
  cardActions: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  },
}))
