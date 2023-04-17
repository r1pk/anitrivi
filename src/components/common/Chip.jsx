import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Box } from '@mui/material';

const Chip = forwardRef(({ color, children, ...rest }, ref) => {
  return (
    <Box sx={{ px: 1, py: 0.5, borderRadius: 1, backgroundColor: color }} ref={ref} {...rest}>
      {children}
    </Box>
  );
});

Chip.displayName = 'Chip';

Chip.propTypes = {
  color: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Chip;
