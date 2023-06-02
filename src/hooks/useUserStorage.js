import { useEffect, useState } from 'react';

import ls from 'localstorage-slim';

export const useUserStorage = ({ userId }) => {
  const [userStorage, setUserStorage] = useState(function getInitialUserStorage() {
    const initialUserStorage = {
      settings: {
        language: 'english',
      },
      guesses: {},
    };

    return Object.assign({}, initialUserStorage, ls.get(userId));
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
