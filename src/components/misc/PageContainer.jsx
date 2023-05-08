import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Box, Fade, LinearProgress } from '@mui/material';

const PageContainer = forwardRef(({ isLoaderVisible, children, ...rest }, ref) => {
  return (
    <Box sx={{ mt: { xs: 2, lg: 4 } }} ref={ref} {...rest}>
      <Fade mountOnEnter unmountOnExit timeout={500} in={isLoaderVisible}>
        <LinearProgress sx={{ position: 'absolute', top: 0, left: 0, width: 1 }} />
      </Fade>
      {children}
    </Box>
  );
});

PageContainer.displayName = 'PageContainer';

PageContainer.propTypes = {
  isLoaderVisible: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default PageContainer;
