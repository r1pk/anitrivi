import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Box, Stack, Typography } from '@mui/material';

const UserChip = forwardRef(({ user, ...rest }, ref) => {
  return (
    <Box sx={{ '&:hover': { background: 'rgba(0, 0, 0, 0.2)' } }} ref={ref} {...rest}>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', p: 1 }}>
        <Box component="img" src={user.avatar.large} alt={user.name} sx={{ width: 32, height: 32 }} />
        <Typography variant="button">{user.name}</Typography>
      </Stack>
    </Box>
  );
});

UserChip.displayName = 'UserChip';

UserChip.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.shape({
      large: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default UserChip;
