import { useEffect, useState } from 'react';

import ls from 'localstorage-slim';

export const useUserStorage = ({ userId, initialStorage }) => {
  const [userStorage, setUserStorage] = useState(function getInitialUserStorage() {
    return ls.get(userId) ?? initialStorage;
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
