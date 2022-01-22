import { createTheme, ThemeOptions } from '@mui/material';

declare module '@mui/material/styles' {
  interface PaletteColorOptions {
    light?: string;
    main: string;
    dark?: string;
    contrastText?: string;
    loader?: string;
  }
  interface PaletteOptions {
    loader?: string;
  }
}

export enum themeNames {
  LIGHT = 'light',
  DARK = 'dark',
}

const themes: { [key: string]: any } = {
  [themeNames.LIGHT]: createTheme({
    palette: {
      mode: 'light',
      secondary: {
        main: '#c2cef0',
      },
      loader: '#1976d2',
    },
  }),
  [themeNames.DARK]: createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#251180',
      },
      secondary: {
        main: '#002572',
      },
      loader: 'white',
    },
  }),
};

export default themes;
