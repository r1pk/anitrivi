import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Card, CardContent, Typography, Divider, Stack } from '@mui/material';

const SearchResults = forwardRef(({ children, ...rest }, ref) => {
  return (
    <Card ref={ref} {...rest}>
      <CardContent>
        <Typography gutterBottom variant="button" component="div">
          Search Results
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Stack spacing={1}>{children}</Stack>
      </CardContent>
    </Card>
  );
});

SearchResults.displayName = 'SearchResults';

SearchResults.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default SearchResults;
