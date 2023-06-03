import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Box, Fade, LinearProgress } from '@mui/material';

import { mergeSx } from '@/utils/merge-sx';

const PageContainer = forwardRef(({ sx, isLoaderVisible, children, ...rest }, ref) => {
  return (
    <Box sx={mergeSx({ mt: { xs: 4, lg: 8 } }, sx)} ref={ref} {...rest}>
      <Fade mountOnEnter unmountOnExit timeout={500} in={isLoaderVisible}>
        <LinearProgress sx={{ position: 'absolute', top: 0, left: 0, width: 1 }} />
      </Fade>
      {children}
    </Box>
  );
});

PageContainer.displayName = 'PageContainer';

PageContainer.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
  ]),
  isLoaderVisible: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default PageContainer;
