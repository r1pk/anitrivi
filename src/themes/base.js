export const base = {
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&:last-child': {
            paddingBottom: theme.spacing(2),
          },
        }),
      },
    },
  },
};
