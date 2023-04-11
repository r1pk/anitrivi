import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Card, CardContent, Typography, Divider } from '@mui/material';

const PanelCard = forwardRef(({ title, children, ...rest }, ref) => {
  return (
    <Card ref={ref} {...rest}>
      <CardContent>
        {title && (
          <>
            <Typography gutterBottom variant="button" component="div">
              {title}
            </Typography>
            <Divider sx={{ my: 1 }} />
          </>
        )}
        {children}
      </CardContent>
    </Card>
  );
});

PanelCard.displayName = 'PanelCard';

PanelCard.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default PanelCard;
