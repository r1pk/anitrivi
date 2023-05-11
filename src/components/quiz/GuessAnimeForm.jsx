import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Controller, useForm } from 'react-hook-form';

import { Autocomplete, Button, Card, CardActions, Stack, TextField, createFilterOptions } from '@mui/material';

import { getTitleByPreference } from '@/utils/get-title-by-preference';

const GuessAnimeForm = forwardRef(({ options, language, onSubmit, ...rest }, ref) => {
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

  const filterOptions = createFilterOptions({
    limit: 15,
    stringify: (option) => {
      // prettier-ignore
      return Object.values(option.media.title).filter((title) => title).join('⋆');
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
            render={({ field: { value, onChange } }) => (
              <Autocomplete
                fullWidth
                value={value}
                options={options}
                filterOptions={filterOptions}
                onChange={(_, option) => onChange(option)}
                getOptionLabel={(option) => getTitleByPreference(option.media.title, language)}
                isOptionEqualToValue={(option, value) => option.mediaId === value.mediaId}
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
      mediaId: PropTypes.number.isRequired,
      media: PropTypes.shape({
        title: PropTypes.shape({
          english: PropTypes.string,
          romaji: PropTypes.string,
          native: PropTypes.string,
        }).isRequired,
      }).isRequired,
    })
  ).isRequired,
  language: PropTypes.oneOf(['english', 'romaji', 'native']),
  onSubmit: PropTypes.func.isRequired,
};

export default GuessAnimeForm;
