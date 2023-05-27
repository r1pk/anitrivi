import { useState } from 'react';

import { getDailySeed } from '@/utils/get-daily-seed';

export const useSeed = ({ additionalFactor = 1000 }) => {
  const [seed, setSeed] = useState(function getInitialSeed() {
    return getDailySeed() + additionalFactor;
  });

  const randomizeSeed = () => {
    setSeed(getDailySeed() + Math.floor(Math.random() * additionalFactor));
  };

  return {
    seed: seed,
    randomizeSeed: randomizeSeed,
  };
};
