import { useMemo } from 'react';

import { useUserProfile } from '@/apis/anilist';

import { useQuiz } from './useQuiz';
import { useSeed } from './useSeed';

export const useUserQuiz = ({ userId }) => {
  const { data, isSuccess, isInitialLoading } = useUserProfile({ userId: userId });
  const { seed, setSeed, randomizeSeed } = useSeed({ additionalFactor: userId * 123 });

  const series = useMemo(() => {
    const lists = data?.lists.map((list) => list.entries).flat();
    const entries = lists?.map((entry) => [entry.media.id, entry.media]);

    return [...new Map(entries).values()];
  }, [data]);

  const quiz = useQuiz({ id: userId, series: series, seed: seed });

  return Object.assign({}, quiz, {
    isReady: isSuccess && quiz.isReady,
    isInitialLoading: isInitialLoading,

    user: data?.user,

    setSeed: setSeed,
    randomizeSeed: randomizeSeed,
  });
};
