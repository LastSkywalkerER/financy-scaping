import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(({ palette }) => ({
  button: {
    color: palette?.text?.primary,
  },
}))
