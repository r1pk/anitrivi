import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Box, Typography } from '@mui/material';

import { mergeSx } from '@/utils/merge-sx';

const Chip = forwardRef(({ sx, color, label, ...rest }, ref) => {
  return (
    <Box sx={mergeSx({ px: 1, py: 0.5, borderRadius: 1, backgroundColor: color }, sx)} ref={ref} {...rest}>
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
  color: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Chip;
