import PropTypes from 'prop-types';
import { forwardRef, useId } from 'react';

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const LanguageSelect = forwardRef(({ label, value, languages, onChangeLanguage, ...rest }, ref) => {
  const labelId = useId();

  const handleChangeLanguage = (event) => {
    onChangeLanguage(event.target.value);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 120 }} ref={ref} {...rest}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select labelId={labelId} label={label} value={value} onChange={handleChangeLanguage}>
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
  onChangeLanguage: PropTypes.func.isRequired,
};

export default LanguageSelect;
