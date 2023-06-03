import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Card, CardContent, CardHeader, Divider } from '@mui/material';

const PanelCard = forwardRef(({ title, children, ...rest }, ref) => {
  return (
    <Card ref={ref} {...rest}>
      {title && (
        <>
          <CardHeader title={title} titleTypographyProps={{ variant: 'button' }} sx={{ p: 2, pb: 1 }} />
          <Divider sx={{ mx: 2 }} />
        </>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
});

PanelCard.displayName = 'PanelCard';
PanelCard.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default PanelCard;
