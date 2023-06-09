import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Controller, useForm } from 'react-hook-form';

import { Button, FormControl, MenuItem, Select, Stack, Typography } from '@mui/material';

import PanelCard from '@/components/misc/PanelCard';

const blueprint = {
  language: {
    options: [
      { label: 'English', value: 'english' },
      { label: 'Romaji', value: 'romaji' },
      { label: 'Native', value: 'native' },
    ],
  },
};

const SettingsForm = forwardRef(({ defaultValues, onCancel, onSubmit, ...rest }, ref) => {
  const { control, formState, handleSubmit } = useForm({
    mode: 'all',
    defaultValues: Object.assign(
      {
        language: 'english',
      },
      defaultValues
    ),
  });
  const { isDirty } = formState;

  const handleFormSubmit = (data) => {
    if (!isDirty) {
      return;
    }

    onSubmit(data);
  };

  return (
    <PanelCard title="Settings" component="form" onSubmit={handleSubmit(handleFormSubmit)} ref={ref} {...rest}>
      <Stack spacing={2}>
        <FormControl fullWidth component="fieldset">
          <Typography variant="overline" color="text.secondary" component="legend" sx={{ p: 0 }}>
            Title Language
          </Typography>
          <Controller
            control={control}
            name="language"
            render={({ field }) => (
              <Select size="small" {...field}>
                {blueprint.language.options.map(({ label, value }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" disabled={!isDirty}>
            Save
          </Button>
        </Stack>
      </Stack>
    </PanelCard>
  );
});

SettingsForm.displayName = 'SettingsForm';

SettingsForm.propTypes = {
  defaultValues: PropTypes.shape({
    language: PropTypes.oneOf(['english', 'romaji', 'native']),
  }),
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SettingsForm;
