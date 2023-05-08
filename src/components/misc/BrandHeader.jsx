import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Quiz } from '@mui/icons-material';
import { Typography } from '@mui/material';

const BrandHeader = forwardRef(({ variant, ...rest }, ref) => {
  return (
    <Typography variant={variant} component="div" sx={{ display: 'flex', alignItems: 'center' }} ref={ref} {...rest}>
      <Quiz sx={{ mr: 1, fontSize: 'inherit' }} /> AniTrivi
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
