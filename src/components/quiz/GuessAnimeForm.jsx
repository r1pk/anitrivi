import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Controller, useForm } from 'react-hook-form';

import { Autocomplete, Button, Card, CardActions, Stack, TextField, createFilterOptions } from '@mui/material';

import { useQuizSettingsContext } from '@/contexts/QuizSettings';

import { getTitleByPreference } from '@/utils/get-title-by-preference';

const GuessAnimeForm = forwardRef(({ options, onSubmit, ...rest }, ref) => {
  const { quizSettings } = useQuizSettingsContext();
  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'all',
    defaultValues: {
      guess: null,
    },
  });
  const { isValid, isDirty } = formState;

  const handleFormSubmit = (data) => {
    if (!isValid || !isDirty) {
      return;
    }

    onSubmit(data.guess);
    reset();
  };

  const getOptionLabel = (option) => {
    return getTitleByPreference(option.title, quizSettings.titleLanguage);
  };

  const isOptionEqualToValue = (option, value) => {
    return option.id === value.id;
  };

  const filterOptions = createFilterOptions({
    trim: true,
    limit: quizSettings.suggestionLimit,
    stringify: (option) => Object.values(option.title).filter(Boolean).join('⚛'),
  });

  return (
    <Card component="form" onSubmit={handleSubmit(handleFormSubmit)} ref={ref} {...rest}>
      <CardActions>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', width: 1 }}>
          <Controller
            name="guess"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Autocomplete
                fullWidth
                options={options}
                value={field.value}
                filterOptions={filterOptions}
                getOptionLabel={getOptionLabel}
                isOptionEqualToValue={isOptionEqualToValue}
                onChange={(_, option) => field.onChange(option)}
                renderInput={(params) => <TextField label="Anime Title" {...params} />}
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

GuessAnimeForm.displayName = 'GuessAnimeForm';
GuessAnimeForm.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.shape({
        english: PropTypes.string,
        romaji: PropTypes.string,
        native: PropTypes.string,
      }).isRequired,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default GuessAnimeForm;
