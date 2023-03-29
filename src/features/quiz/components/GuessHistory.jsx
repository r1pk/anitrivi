import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Card, CardContent, Divider, Stack } from '@mui/material';

const GuessHistory = forwardRef(({ children, ...rest }, ref) => {
  return (
    <Card ref={ref} {...rest}>
      <CardContent>
        <Stack spacing={1} divider={<Divider />}>
          {children}
        </Stack>
      </CardContent>
    </Card>
  );
});

GuessHistory.displayName = 'GuessHistory';

GuessHistory.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default GuessHistory;
