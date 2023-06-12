import { useMemo } from 'react';

import { useUserProfile } from '@/apis/anilist';

import { useQuiz } from './useQuiz';
import { useSeed } from './useSeed';

export const useUserQuiz = ({ userId }) => {
  const { data, isSuccess, isInitialLoading } = useUserProfile({ userId: userId });
  const { seed, randomizeSeed } = useSeed({ additionalFactor: userId * 123 });

  const series = useMemo(() => {
    const lists = data?.lists.map((list) => list.entries).flat();
    const entries = lists?.map((entry) => [entry.media.id, entry.media]);

    return [...new Map(entries).values()];
  }, [data]);

  const quiz = useQuiz({ series: series, seed: seed });

  return {
    isReady: isSuccess && quiz.isReady,
    isFinished: quiz.isFinished,
    isInitialLoading: isInitialLoading,
    isRequirementFulfilled: quiz.isRequirementFulfilled,

    user: data?.user,
    series: quiz.series,
    seed: quiz.seed,

    anime: quiz.anime,
    guesses: quiz.guesses,

    guessAnime: quiz.guessAnime,
    restoreGuesses: quiz.restoreGuesses,
    randomizeSeed: randomizeSeed,
  };
};
