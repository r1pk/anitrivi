import { useState, useMemo, useEffect } from 'react';

import { useUserProfile } from '@/apis/anilist';

import { evaluateAnswer } from '../utils/evaluate-answer';

export const useUserQuiz = (userId) => {
  const { data, isFetched } = useUserProfile(userId);

  const [isFinished, setIsFinished] = useState(false);
  const [featuredAnime, setFeaturedAnime] = useState(null);
  const [guessHistory, setGuessHistory] = useState([]);

  const isReady = isFetched && !!featuredAnime;
  const availableSeries = useMemo(() => data?.lists.map((list) => list.entries).flat(), [data]);

  useEffect(
    function pickFeaturedAnime() {
      if (!availableSeries || availableSeries.length === 0) return;

      const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;
      const randomIndex = Math.floor(Date.now() / MILLISECONDS_IN_DAY) % availableSeries.length;

      setFeaturedAnime(availableSeries[randomIndex]);
    },
    [availableSeries]
  );

  const guessFeaturedAnime = (answer) => {
    const evaluation = evaluateAnswer(featuredAnime.media, answer.media);

    if (answer.mediaId === featuredAnime.mediaId) {
      setIsFinished(true);
    }

    setGuessHistory([{ anime: answer.media, evaluation: evaluation }, ...guessHistory]);
  };

  return {
    isReady: isReady,
    isFinished: isFinished,
    targetUser: data?.user,
    availableSeries: availableSeries,
    featuredAnime: featuredAnime,
    guessHistory: guessHistory,
    guessFeaturedAnime: guessFeaturedAnime,
  };
};
