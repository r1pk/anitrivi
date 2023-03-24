import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import Joi from 'joi';

import { TextField, Button, Card, CardActions, Stack } from '@mui/material';
import { Search } from '@mui/icons-material';

import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

const schema = Joi.object({
  username: Joi.string().trim().alphanum().min(2).max(20).required().label('username'),
});

const SearchUserForm = forwardRef(({ onSearchUser, ...rest }, ref) => {
  const { control, formState, handleSubmit } = useForm({
    mode: 'all',
    defaultValues: {
      username: '',
    },
    resolver: joiResolver(schema),
  });
  const { isValid, isDirty } = formState;

  const onSubmit = (data) => {
    if (isValid && isDirty) {
      onSearchUser(data);
    }
  };

  return (
    <Card component="form" onSubmit={handleSubmit(onSubmit)} ref={ref} {...rest}>
      <CardActions>
        <Stack direction="row" spacing={1} sx={{ width: 1, alignItems: 'center' }}>
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
  onSearchUser: PropTypes.func.isRequired,
};

export default SearchUserForm;
