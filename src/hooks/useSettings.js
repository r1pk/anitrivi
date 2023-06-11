import { useEffect, useState } from 'react';

import ls from 'localstorage-slim';

export const useSettings = () => {
  const [settings, setSettings] = useState(function getInitialSettings() {
    const initialSettings = {
      language: 'english',
    };

    return Object.assign({}, initialSettings, ls.get('settings'));
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
