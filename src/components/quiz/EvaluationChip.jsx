import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Stack, Typography } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

import { getOrDefault } from '@/utils/get-or-default';

import Chip from '@/components/common/Chip';

const EvaluationChip = forwardRef(({ label, value, evaluation, ...rest }, ref) => {
  const isSimpleEvaluation = ['correct', 'partial', 'incorrect'].includes(evaluation);
  const isNumericEvaluation = ['higher', 'lower'].includes(evaluation);

  const color = isSimpleEvaluation ? `evaluation.${evaluation}` : 'evaluation.incorrect';
  const icon = {
    higher: <ArrowUpward sx={{ fontSize: 'inherit' }} />,
    lower: <ArrowDownward sx={{ fontSize: 'inherit' }} />,
  };

  return (
    <Chip color={color} ref={ref} {...rest}>
      <Stack direction="row" gap={0.5} sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="caption">{label}:</Typography>
        <Typography variant="button" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {getOrDefault(value)} {isNumericEvaluation && icon[evaluation]}
        </Typography>
      </Stack>
    </Chip>
  );
});

EvaluationChip.displayName = 'EvaluationChip';

EvaluationChip.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  evaluation: PropTypes.oneOf(['correct', 'partial', 'incorrect', 'higher', 'lower']).isRequired,
};

export default EvaluationChip;
