import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';

import { EVALUATION } from '@/utils/evaluate-answer';
import { getOrDefault } from '@/utils/get-or-default';
import { mergeSx } from '@/utils/merge-sx';

const EvaluationChip = forwardRef(({ sx, label, value, evaluation, ...rest }, ref) => {
  const color = `evaluation.${evaluation}`;
  const icon = {
    [EVALUATION.HIGHER]: <ArrowUpward sx={{ fontSize: 'inherit' }} />,
    [EVALUATION.LOWER]: <ArrowDownward sx={{ fontSize: 'inherit' }} />,
  };
  const isIconIncluded = Object.keys(icon).includes(evaluation);

  return (
    <Stack direction="row" gap={0.5} sx={mergeSx({ alignItems: 'center' }, sx)} ref={ref} {...rest}>
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
  sx: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
  ]),
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  evaluation: PropTypes.oneOf(Object.values(EVALUATION)).isRequired,
};

export default EvaluationChip;
