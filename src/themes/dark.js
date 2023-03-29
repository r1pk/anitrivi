import { createTheme, responsiveFontSizes } from '@mui/material';
import { green, orange, red } from '@mui/material/colors';

export const dark = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      evaluation: {
        correct: green[700],
        partial: orange[700],
        incorrect: red[700],
      },
    },
  })
);
