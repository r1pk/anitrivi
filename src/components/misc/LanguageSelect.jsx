import { forwardRef, useId } from 'react';

import PropTypes from 'prop-types';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { mergeSx } from '@/utils/merge-sx';

const LanguageSelect = forwardRef(({ sx, label, value, languages, onChangeLanguage, ...rest }, ref) => {
  const labelId = useId();

  const handleChangeLanguage = (event) => {
    onChangeLanguage(event.target.value);
  };

  return (
    <FormControl size="small" sx={mergeSx({ minWidth: 120 }, sx)} ref={ref} {...rest}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        label={label}
        value={value}
        onChange={handleChangeLanguage}
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
  sx: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
  ]),
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  languages: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChangeLanguage: PropTypes.func.isRequired,
};

export default LanguageSelect;
