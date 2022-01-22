import { ThemeOptions } from '@mui/material';

export type Style = string | number;
export type DefaultStyle = { [key: string]: Style };
export type FunctionalStyle = (props: any) => DefaultStyle;
export type ContextStyles = {
  [key: string]: DefaultStyle | FunctionalStyle;
};
export type FinishStyles = {
  [key: string]: DefaultStyle;
};
export type GlobalStyles =
  | ContextStyles
  | ((theme: ThemeOptions) => ContextStyles);
