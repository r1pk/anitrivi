import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Edit, Shuffle } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';

import { getOrDefault } from '@/utils/get-or-default';
import { mergeSx } from '@/utils/merge-sx';

const SeedControlPanel = forwardRef(({ sx, seed, onChangeSeed, onRandomizeSeed, ...rest }, ref) => {
  return (
    <Box sx={mergeSx({ display: 'flex', justifyContent: 'center', alignItems: 'center' }, sx)} ref={ref} {...rest}>
      <Typography variant="overline" color="inherit">
        Seed: {getOrDefault(seed)}
      </Typography>
      <Stack direction="row" sx={{ ml: 1 }}>
        <IconButton size="small" color="inherit" onClick={onChangeSeed}>
          <Edit fontSize="inherit" />
        </IconButton>
        <IconButton size="small" color="inherit" onClick={onRandomizeSeed}>
          <Shuffle fontSize="inherit" />
        </IconButton>
      </Stack>
    </Box>
  );
});

SeedControlPanel.displayName = 'SeedControlPanel';
SeedControlPanel.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
  ]),
  seed: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChangeSeed: PropTypes.func.isRequired,
  onRandomizeSeed: PropTypes.func.isRequired,
};

export default SeedControlPanel;
