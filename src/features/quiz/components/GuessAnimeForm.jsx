import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Card, CardActions, Stack, Autocomplete, TextField, Button } from '@mui/material';

import { Controller, useForm } from 'react-hook-form';

const GuessAnimeForm = forwardRef(({ options, onGuessAnime, ...rest }, ref) => {
  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'all',
    defaultValues: {
      answer: null,
    },
  });
  const { isValid, isDirty } = formState;

  const onSubmit = (data) => {
    if (isValid && isDirty) {
      onGuessAnime(data.answer);
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
                getOptionLabel={(option) => option.media.title.english || option.media.title.romaji}
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
  onGuessAnime: PropTypes.func.isRequired,
};

export default GuessAnimeForm;
