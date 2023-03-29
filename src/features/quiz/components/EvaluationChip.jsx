import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Box, Typography } from '@mui/material';

const EvaluationChip = forwardRef(({ label, value, evaluation, ...rest }, ref) => {
  const evaluationColor = `evaluation.${evaluation}`;
  const displayValue = value || 'N/A';

  return (
    <Box sx={{ backgroundColor: evaluationColor, py: 0.5, px: 1, borderRadius: 1 }} ref={ref} {...rest}>
      <Typography component="div" variant="button" sx={{ textAlign: 'center' }}>
        {label}: {displayValue}
      </Typography>
    </Box>
  );
});

EvaluationChip.displayName = 'EvaluationChip';

EvaluationChip.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  evaluation: PropTypes.oneOf(['correct', 'partial', 'incorrect']).isRequired,
};

export default EvaluationChip;
