import { createContext, useContext, useEffect, useState } from 'react';

import ls from 'localstorage-slim';

import { defaultSettings } from '@/configs/default-settings';

const SettingsContext = createContext({
  settings: defaultSettings,
  setSettings: () => {},
});

const SettingsContextProvider = ({ children, ...rest }) => {
  const [settings, setSettings] = useState(function getInitialSettings() {
    return Object.assign({}, defaultSettings, ls.get('settings'));
  });

  useEffect(
    function persistSettings() {
      ls.set('settings', settings);
    },
    [settings]
  );

  return (
    <SettingsContext.Provider value={{ settings, setSettings }} {...rest}>
      {children}
    </SettingsContext.Provider>
  );
};
const useSettingsContext = () => useContext(SettingsContext);

export default SettingsContextProvider;
export { useSettingsContext };
