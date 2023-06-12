import { createContext } from 'react';

import { defaultSettings } from '@/configs/default-settings';

export const SettingsContext = createContext(defaultSettings);
