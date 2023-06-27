import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Controller, useForm } from 'react-hook-form';

import { Button, FormControl, MenuItem, Select, Stack, Typography } from '@mui/material';

import { useSettingsContext } from '@/contexts/Settings';

import PanelCard from '@/components/misc/PanelCard';

const SettingsForm = forwardRef(({ onCancel, onSubmit, ...rest }, ref) => {
  const { settings, setSettings } = useSettingsContext();
  const { control, formState, handleSubmit } = useForm({
    mode: 'all',
    defaultValues: settings,
  });
  const { isDirty } = formState;

  const handleFormSubmit = (data) => {
    if (!isDirty) {
      return;
    }

    setSettings(data);
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
                <MenuItem value="english">English</MenuItem>
                <MenuItem value="romaji">Romaji</MenuItem>
                <MenuItem value="native">Native</MenuItem>
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
                <MenuItem value={false}>None</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
              </Select>
            )}
          />
        </FormControl>
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          {onCancel && (
            <Button variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
          )}
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
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
};

export default SettingsForm;
