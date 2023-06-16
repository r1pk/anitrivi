import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Controller, useForm } from 'react-hook-form';

import { Button, FormControl, MenuItem, Select, Stack, Typography } from '@mui/material';

import PanelCard from '@/components/misc/PanelCard';

import { defaultSettings } from '@/configs/default-settings';

const blueprint = {
  language: {
    options: [
      { label: 'English', value: 'english' },
      { label: 'Romaji', value: 'romaji' },
      { label: 'Native', value: 'native' },
    ],
  },
  suggestionLimit: {
    options: [
      { label: '1', value: 1 },
      { label: '5', value: 5 },
      { label: '10', value: 10 },
      { label: '15', value: 15 },
      { label: 'None', value: false },
    ],
  },
};

const SettingsForm = forwardRef(({ defaultValues, onCancel, onSubmit, ...rest }, ref) => {
  const { control, formState, handleSubmit } = useForm({
    mode: 'all',
    defaultValues: Object.assign({}, defaultSettings, defaultValues),
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
            name="language"
            control={control}
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
        <FormControl fullWidth component="fieldset">
          <Typography variant="overline" color="text.secondary" component="legend" sx={{ p: 0 }}>
            Suggestion Limit
          </Typography>
          <Controller
            name="suggestionLimit"
            control={control}
            render={({ field }) => (
              <Select size="small" {...field}>
                {blueprint.suggestionLimit.options.map(({ label, value }) => (
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
    suggestionLimit: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  }),
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SettingsForm;
