import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { Controller, useForm } from 'react-hook-form';

import { Search } from '@mui/icons-material';
import { Button, Card, CardActions, Stack, TextField } from '@mui/material';

const schema = Joi.object({
  username: Joi.string().trim().alphanum().min(2).max(20).required().label('username'),
});

const SearchUserForm = forwardRef(({ onSubmit, ...rest }, ref) => {
  const { control, formState, handleSubmit } = useForm({
    mode: 'all',
    defaultValues: {
      username: '',
    },
    resolver: joiResolver(schema),
  });
  const { isValid, isDirty } = formState;

  const handleFormSubmit = (data) => {
    if (!isValid || !isDirty) {
      return;
    }

    onSubmit(data);
  };

  return (
    <Card component="form" onSubmit={handleSubmit(handleFormSubmit)} ref={ref} {...rest}>
      <CardActions>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', width: 1 }}>
          <Controller
            name="username"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                variant="outlined"
                placeholder="AniList Username"
                error={Boolean(fieldState.error)}
                fullWidth
                {...field}
              />
            )}
          />
          <Button
            type="submit"
            disabled={!(isValid && isDirty)}
            variant="contained"
            size="large"
            startIcon={<Search />}
          >
            Search
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
});

SearchUserForm.displayName = 'SearchUserForm';

SearchUserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchUserForm;
