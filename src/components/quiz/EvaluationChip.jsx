import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';

import { EVALUATION } from '@/utils/evaluate-answer';
import { getOrDefault } from '@/utils/get-or-default';

const EvaluationChip = forwardRef(({ label, value, evaluation, ...rest }, ref) => {
  const color = `evaluation.${evaluation}`;
  const icon = {
    [EVALUATION.HIGHER]: <ArrowUpward sx={{ fontSize: 'inherit' }} />,
    [EVALUATION.LOWER]: <ArrowDownward sx={{ fontSize: 'inherit' }} />,
  };
  const isIconIncluded = Object.keys(icon).includes(evaluation);

  return (
    <Stack direction="row" gap={0.5} sx={{ alignItems: 'center' }} ref={ref} {...rest}>
      <Typography variant="caption" color="text.secondary">
        {label}:
      </Typography>
      <Typography variant="button" color={color} sx={{ display: 'flex', alignItems: 'center' }}>
        {getOrDefault(value)} {isIconIncluded && icon[evaluation]}
      </Typography>
    </Stack>
  );
});

EvaluationChip.displayName = 'EvaluationChip';

EvaluationChip.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  evaluation: PropTypes.oneOf(Object.values(EVALUATION)).isRequired,
};

export default EvaluationChip;
