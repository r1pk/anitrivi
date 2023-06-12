import { useEffect, useState } from 'react';

import ls from 'localstorage-slim';

import { defaultSettings } from '@/configs/default-settings';

export const useSettings = () => {
  const [settings, setSettings] = useState(function getInitialSettings() {
    return Object.assign({}, defaultSettings, ls.get('settings'));
  });

  useEffect(
    function persistSettings() {
      ls.set('settings', settings);
    },
    [settings]
  );

  return {
    settings: settings,
    setSettings: setSettings,
  };
};
