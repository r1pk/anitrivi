import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Box, Typography } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

import { getOrDefault } from '@/utils/get-or-default';

const EvaluationChip = forwardRef(({ label, value, evaluation, ...rest }, ref) => {
  const isSimpleEvaluation = ['correct', 'partial', 'incorrect'].includes(evaluation);
  const isNumericEvaluation = ['higher', 'lower'].includes(evaluation);

  const color = isSimpleEvaluation ? `evaluation.${evaluation}` : 'evaluation.incorrect';
  const icon = {
    higher: <ArrowUpward sx={{ fontSize: 'inherit' }} />,
    lower: <ArrowDownward sx={{ fontSize: 'inherit' }} />,
  };

  return (
    <Box sx={{ backgroundColor: color, py: 0.5, px: 1, borderRadius: 1 }} ref={ref} {...rest}>
      <Typography variant="button" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {label}: {getOrDefault(value)} {isNumericEvaluation && icon[evaluation]}
      </Typography>
    </Box>
  );
});

EvaluationChip.displayName = 'EvaluationChip';

EvaluationChip.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  evaluation: PropTypes.oneOf(['correct', 'partial', 'incorrect', 'higher', 'lower']).isRequired,
};

export default EvaluationChip;
