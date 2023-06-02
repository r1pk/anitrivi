import { createTheme, responsiveFontSizes } from '@mui/material';
import { green, grey, orange, red } from '@mui/material/colors';

export const dark = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      evaluation: {
        correct: green[700],
        higher: red[700],
        lower: red[700],
        partial: orange[700],
        incorrect: red[700],
        unknown: grey[700],
      },
    },
  })
);
