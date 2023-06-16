import { useEffect, useState } from 'react';

import ls from 'localstorage-slim';

import { defaultUserStorage } from '@/configs/default-user-storage';

export const useUserStorage = ({ userId }) => {
  const [userStorage, setUserStorage] = useState(function getInitialUserStorage() {
    return Object.assign({}, defaultUserStorage, ls.get(userId));
  });

  useEffect(
    function persistUserStorage() {
      ls.set(userId, userStorage);
    },
    [userId, userStorage]
  );

  return {
    userStorage: userStorage,
    setUserStorage: setUserStorage,
  };
};
