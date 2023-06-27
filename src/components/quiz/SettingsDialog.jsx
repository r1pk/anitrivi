import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Dialog } from '@mui/material';

import SettingsForm from './SettingsForm';

const SettingsDialog = forwardRef(({ isOpen, onClose, ...rest }, ref) => {
  return (
    <Dialog fullWidth disableScrollLock maxWidth="xs" open={isOpen} onClose={onClose} ref={ref} {...rest}>
      <SettingsForm onCancel={onClose} onSubmit={onClose} />
    </Dialog>
  );
});

SettingsDialog.displayName = 'SettingsDialog';
SettingsDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SettingsDialog;
