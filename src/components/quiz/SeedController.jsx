import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Shuffle } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

import { getOrDefault } from '@/utils/get-or-default';
import { mergeSx } from '@/utils/merge-sx';

const SeedController = forwardRef(({ sx, seed, onRandomizeSeed, ...rest }, ref) => {
  return (
    <Box sx={mergeSx({ display: 'flex', justifyContent: 'center', alignItems: 'center' }, sx)} ref={ref} {...rest}>
      <Typography variant="overline" color="inherit">
        Seed: {getOrDefault(seed)}
      </Typography>
      <IconButton size="small" color="inherit" onClick={onRandomizeSeed}>
        <Shuffle fontSize="inherit" />
      </IconButton>
    </Box>
  );
});

SeedController.displayName = 'SeedController';
SeedController.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
  ]),
  seed: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onRandomizeSeed: PropTypes.func.isRequired,
};

export default SeedController;
