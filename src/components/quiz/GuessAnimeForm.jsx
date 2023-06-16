import { forwardRef, useContext } from 'react';

import PropTypes from 'prop-types';

import { Controller, useForm } from 'react-hook-form';

import { Autocomplete, Button, Card, CardActions, Stack, TextField, createFilterOptions } from '@mui/material';

import { SettingsContext } from '@/contexts/Settings';

import { getTitleByPreference } from '@/utils/get-title-by-preference';

const GuessAnimeForm = forwardRef(({ options, onSubmit, ...rest }, ref) => {
  const settings = useContext(SettingsContext);

  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'all',
    defaultValues: {
      answer: null,
    },
  });
  const { isValid, isDirty } = formState;

  const handleFormSubmit = (data) => {
    if (!isValid || !isDirty) {
      return;
    }

    onSubmit(data.answer);
    reset();
  };

  const getOptionLabel = (option) => {
    return getTitleByPreference(option.title, settings.language);
  };

  const isOptionEqualToValue = (option, value) => {
    return option.id === value.id;
  };

  // prettier-ignore
  const filterOptions = createFilterOptions({
    limit: settings.suggestionLimit,
    stringify: (option) => {
      return Object.values(option.title).filter((title) => title).join('⋆');
    },
  });

  return (
    <Card component="form" onSubmit={handleSubmit(handleFormSubmit)} ref={ref} {...rest}>
      <CardActions>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', width: 1 }}>
          <Controller
            name="answer"
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
