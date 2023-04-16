import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Typography } from '@mui/material';
import { Quiz } from '@mui/icons-material';

const BrandHeader = forwardRef(({ variant, ...rest }, ref) => {
  return (
    <Typography variant={variant} component="div" sx={{ display: 'flex', alignItems: 'center' }} ref={ref} {...rest}>
      <Quiz sx={{ mr: 1, fontSize: 'inherit' }} />
      <Typography variant="inherit">AniTrivi</Typography>
    </Typography>
  );
});

BrandHeader.displayName = 'BrandHeader';

BrandHeader.propTypes = {
  variant: PropTypes.oneOf([
    'inherit',
    'overline',
    'subtitle1',
    'subtitle2',
    'body1',
    'body2',
    'button',
    'caption',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
  ]),
};

export default BrandHeader;
