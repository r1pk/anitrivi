import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Shuffle } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

import { mergeSx } from '@/utils/merge-sx';

const SeedControl = forwardRef(({ sx, seed, onRandomizeSeed, ...rest }, ref) => {
  return (
    <Box sx={mergeSx({ display: 'flex', justifyContent: 'center', alignItems: 'center' }, sx)} ref={ref} {...rest}>
      <Typography variant="overline" color="inherit">
        Seed: {seed}
      </Typography>
      <IconButton size="small" color="inherit" onClick={onRandomizeSeed}>
        <Shuffle fontSize="inherit" />
      </IconButton>
    </Box>
  );
});

SeedControl.displayName = 'SeedControl';
SeedControl.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
  ]),
  seed: PropTypes.number.isRequired,
  onRandomizeSeed: PropTypes.func.isRequired,
};

export default SeedControl;
