import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Stack, Typography } from '@mui/material';

const PropertyTag = forwardRef(({ sx, label, value, ...rest }, ref) => {
  return (
    <Stack direction="row" gap={0.5} sx={{ alignItems: 'center' }} ref={ref} {...rest}>
      <Typography variant="caption" color="text.secondary">
        {label}:
      </Typography>
      <Typography variant="body2">{value}</Typography>
    </Stack>
  );
});

PropertyTag.displayName = 'PropertyTag';
PropertyTag.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
  ]),
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default PropertyTag;
