import { useState, useMemo, useEffect } from 'react';

import { useUserProfile } from '@/apis/anilist';

import { evaluateAnswer } from '../utils/evaluate-answer';

export const useUserQuiz = (userId) => {
  const { data, isFetched } = useUserProfile(userId);

  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [featuredAnime, setFeaturedAnime] = useState(null);
  const [guessHistory, setGuessHistory] = useState([]);

  const isQuizReady = isFetched && !!featuredAnime;
  const userAnimePool = useMemo(() => data?.lists.map((list) => list.entries).flat(), [data]);

  useEffect(
    function pickFeaturedAnime() {
      if (!userAnimePool || userAnimePool.length === 0) return;

      const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;
      const randomIndex = Math.floor(Date.now() / MILLISECONDS_IN_DAY) % userAnimePool.length;

      setFeaturedAnime(userAnimePool[randomIndex]);
    },
    [userAnimePool]
  );

  const guessFeaturedAnime = (answer) => {
    const evaluation = evaluateAnswer(featuredAnime.media, answer.media);

    if (answer.mediaId === featuredAnime.mediaId) {
      setIsQuizFinished(true);
    }

    setGuessHistory([{ anime: answer.media, evaluation: evaluation }, ...guessHistory]);
  };

  return {
    isQuizReady: isQuizReady,
    isQuizFinished: isQuizFinished,
    user: data?.user,
    userAnimePool: userAnimePool,
    featuredAnime: featuredAnime,
    guessHistory: guessHistory,
    guessFeaturedAnime: guessFeaturedAnime,
  };
};
