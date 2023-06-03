import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Quiz } from '@mui/icons-material';
import { Typography } from '@mui/material';

import { mergeSx } from '@/utils/merge-sx';

const BrandHeader = forwardRef(({ sx, variant, ...rest }, ref) => {
  return (
    <Typography
      variant={variant}
      component="div"
      sx={mergeSx({ display: 'flex', alignItems: 'center' }, sx)}
      ref={ref}
      {...rest}
    >
      <Quiz sx={{ mr: 1, fontSize: 'inherit' }} /> AniTrivi
    </Typography>
  );
});

BrandHeader.displayName = 'BrandHeader';

BrandHeader.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
  ]),
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
