import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Edit, Shuffle } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

import { getOrDefault } from '@/utils/get-or-default';
import { mergeSx } from '@/utils/merge-sx';

const SeedController = forwardRef(({ sx, seed, onChangeSeed, onRandomizeSeed, ...rest }, ref) => {
  const handleChangeSeed = () => {
    let input = prompt('Enter a new seed', seed);

    while (isNaN(parseInt(input)) || parseInt(input) < 0) {
      if (input === null) {
        return;
      }

      input = prompt('Invalid seed. Please enter a positive integer');
    }

    onChangeSeed(parseInt(input));
  };

  return (
    <Box sx={mergeSx({ display: 'flex', justifyContent: 'center', alignItems: 'center' }, sx)} ref={ref} {...rest}>
      <Typography variant="overline" color="inherit">
        Seed: {getOrDefault(seed)}
      </Typography>
      <IconButton size="small" color="inherit" onClick={handleChangeSeed}>
        <Edit fontSize="inherit" />
      </IconButton>
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
  onChangeSeed: PropTypes.func.isRequired,
  onRandomizeSeed: PropTypes.func.isRequired,
};

export default SeedController;
