import { createTheme, responsiveFontSizes } from '@mui/material';
import { green, grey, orange, red } from '@mui/material/colors';
import { deepmerge } from '@mui/utils';

import { base } from './base';

export const dark = responsiveFontSizes(
  createTheme(
    deepmerge(base, {
      palette: {
        mode: 'dark',
        evaluation: {
          correct: green[700],
          partial: orange[700],
          incorrect: red[700],
          unknown: grey[700],
        },
      },
    })
  )
);
