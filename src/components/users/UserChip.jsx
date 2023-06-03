import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Box, Stack, Typography } from '@mui/material';

import { mergeSx } from '@/utils/merge-sx';

const UserChip = forwardRef(({ sx, user, ...rest }, ref) => {
  return (
    <Box sx={mergeSx({ 'borderRadius': 1, '&:hover': { background: 'rgba(0, 0, 0, 0.2)' } }, sx)} ref={ref} {...rest}>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', p: 1 }}>
        <Box component="img" src={user.avatar.large} alt={user.name} sx={{ width: 32, height: 32 }} />
        <Typography variant="button">{user.name}</Typography>
      </Stack>
    </Box>
  );
});

UserChip.displayName = 'UserChip';

UserChip.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
  ]),
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.shape({
      large: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default UserChip;
