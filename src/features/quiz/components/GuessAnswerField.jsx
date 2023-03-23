import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Card, CardActions, Stack, Autocomplete, TextField, Button } from '@mui/material';

import { Controller, useForm } from 'react-hook-form';

const GuessAnswerField = forwardRef(({ label, options, onGuessAnswer, ...rest }, ref) => {
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
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.id === value.id}
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
});

GuessAnswerField.displayName = 'GuessAnswerField';

GuessAnswerField.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onGuessAnswer: PropTypes.func.isRequired,
};

export default GuessAnswerField;
