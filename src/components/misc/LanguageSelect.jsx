import { forwardRef, useId } from 'react';

import PropTypes from 'prop-types';

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const LanguageSelect = forwardRef(({ label, value, languages, onLanguageChange, ...rest }, ref) => {
  const labelId = useId();

  const handleLanguageChange = (event) => {
    onLanguageChange(event.target.value);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 120 }} ref={ref} {...rest}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        label={label}
        value={value}
        onChange={handleLanguageChange}
        MenuProps={{ sx: { position: 'absolute', maxWidth: 0, maxHeight: 300 }, disableScrollLock: true }}
      >
        {languages.map((language) => (
          <MenuItem key={language} value={language}>
            {language}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

LanguageSelect.displayName = 'LanguageSelect';

LanguageSelect.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  languages: PropTypes.arrayOf(PropTypes.string).isRequired,
  onLanguageChange: PropTypes.func.isRequired,
};

export default LanguageSelect;
