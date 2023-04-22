import { useMemo } from 'react';

import { useUserProfile } from '@/apis/anilist';
import { useQuiz } from './useQuiz';

export const useUserQuiz = (userId) => {
  const { data, isSuccess, isInitialLoading } = useUserProfile(userId);

  const series = useMemo(() => data?.lists.map((list) => list.entries).flat(), [data]);

  const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;
  const seed = Math.floor(Date.now() / MILLISECONDS_IN_DAY) + userId * 123;

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
  };
};
