import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';

import { EVALUATION } from '@/utils/evaluate-answer';
import { getOrDefault } from '@/utils/get-or-default';
import { mergeSx } from '@/utils/merge-sx';

const EvaluationTag = forwardRef(({ sx, label, value, evaluation, ...rest }, ref) => {
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
      <Typography variant="button" color={`evaluation.${evaluation}`} sx={{ display: 'flex', alignItems: 'center' }}>
        {getOrDefault(value)} {isIconIncluded && icon[evaluation]}
      </Typography>
    </Stack>
  );
});

EvaluationTag.displayName = 'EvaluationTag';
EvaluationTag.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
  ]),
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  evaluation: PropTypes.oneOf(['correct', 'higher', 'lower', 'partial', 'incorrect', 'unknown']).isRequired,
};

export default EvaluationTag;
