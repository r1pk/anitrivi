import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Box, Typography } from '@mui/material';

import { mergeSx } from '@/utils/merge-sx';

const Chip = forwardRef(({ sx, label, ...rest }, ref) => {
  return (
    <Box sx={mergeSx({ px: 1, py: 0.5, borderRadius: 1 }, sx)} ref={ref} {...rest}>
      <Typography variant="caption" sx={{ whiteSpace: 'nowrap' }}>
        {label}
      </Typography>
    </Box>
  );
});

Chip.displayName = 'Chip';
Chip.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
  ]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Chip;
