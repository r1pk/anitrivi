import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Box } from '@mui/material';

import { mergeSx } from '@/utils/merge-sx';

const Chip = forwardRef(({ sx, color, children, ...rest }, ref) => {
  return (
    <Box sx={mergeSx({ px: 1, py: 0.5, borderRadius: 1, backgroundColor: color }, sx)} ref={ref} {...rest}>
      {children}
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
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Chip;
