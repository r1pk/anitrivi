import { useState } from 'react';

import { getDailySeed } from '@/utils/get-daily-seed';

export const useSeed = ({ additionalFactor = 1000 }) => {
  const [seed, setSeed] = useState(function getInitialSeed() {
    return getDailySeed() + additionalFactor;
  });

  const changeSeed = () => {
    let input = prompt('Enter a new seed', seed);

    while (isNaN(parseInt(input)) || parseInt(input) < 0) {
      if (input === null) {
        return;
      }

      input = prompt('Invalid seed. Please enter a positive integer');
    }

    setSeed(parseInt(input));
  };

  const randomizeSeed = () => {
    setSeed(getDailySeed() + Math.floor(Math.random() * additionalFactor));
  };

  return {
    seed: seed,
    changeSeed: changeSeed,
    randomizeSeed: randomizeSeed,
  };
};
