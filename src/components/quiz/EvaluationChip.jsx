import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';

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
    <Stack direction="row" gap={0.5} sx={{ alignItems: 'center' }} ref={ref} {...rest}>
      <Typography variant="caption" color="text.secondary">
        {label}:
      </Typography>
      <Typography variant="button" color={color} sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        {getOrDefault(value)} {isNumericEvaluation && icon[evaluation]}
      </Typography>
    </Stack>
  );
});

EvaluationChip.displayName = 'EvaluationChip';

EvaluationChip.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  evaluation: PropTypes.oneOf(['correct', 'partial', 'incorrect', 'higher', 'lower']).isRequired,
};

export default EvaluationChip;
