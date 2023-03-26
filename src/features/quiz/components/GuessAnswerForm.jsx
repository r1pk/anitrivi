import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Card, CardActions, Stack, Autocomplete, TextField, Button } from '@mui/material';

import { Controller, useForm } from 'react-hook-form';

const GuessAnswerForm = forwardRef(
  ({ label, options, onGuessAnswer, getOptionLabel, isOptionEqualToValue, ...rest }, ref) => {
    const { control, formState, handleSubmit, reset } = useForm({
      mode: 'all',
      defaultValues: {
        answer: null,
      },
    });
    const { isValid, isDirty } = formState;

    const onSubmit = (data) => {
      if (isValid && isDirty) {
        onGuessAnswer(data.answer);
        reset();
      }
    };

    return (
      <Card component="form" onSubmit={handleSubmit(onSubmit)} ref={ref} {...rest}>
        <CardActions>
          <Stack direction="row" spacing={1} sx={{ width: 1, alignItems: 'center' }}>
            <Controller
              name="answer"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Autocomplete
                  fullWidth
                  options={options}
                  value={value}
                  onChange={(_, option) => onChange(option)}
                  getOptionLabel={getOptionLabel}
                  isOptionEqualToValue={isOptionEqualToValue}
                  renderInput={(params) => <TextField label={label} {...params} />}
                />
              )}
            />
            <Button type="submit" disabled={!(isValid && isDirty)} variant="contained" size="large">
              Guess
            </Button>
          </Stack>
        </CardActions>
      </Card>
    );
  }
);

GuessAnswerForm.displayName = 'GuessAnswerForm';

GuessAnswerForm.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
  onGuessAnswer: PropTypes.func.isRequired,
  getOptionLabel: PropTypes.func.isRequired,
  isOptionEqualToValue: PropTypes.func.isRequired,
};

export default GuessAnswerForm;
