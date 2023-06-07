import { colors, createTheme, responsiveFontSizes } from '@mui/material';

export const dark = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      evaluation: {
        correct: colors.green[700],
        higher: colors.red[700],
        lower: colors.red[700],
        partial: colors.orange[700],
        incorrect: colors.red[700],
        unknown: colors.grey[700],
      },
      genre: {
        'Action': colors.lime[900],
        'Adventure': colors.purple[900],
        'Comedy': colors.deepOrange[900],
        'Drama': colors.blueGrey[900],
        'Ecchi': colors.pink[900],
        'Fantasy': colors.lightBlue[900],
        'Horror': colors.brown[900],
        'Mahou Shoujo': colors.green[900],
        'Mecha': colors.red[900],
        'Music': colors.amber[900],
        'Mystery': colors.deepPurple[900],
        'Psychological': colors.lightGreen[900],
        'Romance': colors.teal[900],
        'Sci-Fi': colors.indigo[900],
        'Slice of Life': colors.blue[900],
        'Sports': colors.yellow[900],
        'Supernatural': colors.orange[900],
        'Thriller': colors.cyan[900],
      },
    },
  })
);
