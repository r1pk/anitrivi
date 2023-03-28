import { useState, useEffect } from 'react';

import { useUserAnime } from '@/apis/anilist';

import { evaluateAnswer } from '../utils/evaluate-answer';

export const useUserQuiz = (userId) => {
  const { data: userAnime = [], isInitialLoading } = useUserAnime(userId);

  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [featuredAnime, setFeaturedAnime] = useState(null);
  const [guessHistory, setGuessHistory] = useState([]);

  const isQuizReady = !isInitialLoading && !!featuredAnime;

  useEffect(
    function pickFeaturedAnime() {
      if (!userAnime || userAnime.length === 0) return;

      const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;
      const randomIndex = Math.floor(Date.now() / MILLISECONDS_IN_DAY) % userAnime.length;

      setFeaturedAnime(userAnime[randomIndex]);
    },
    [userAnime]
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
    featuredAnime: featuredAnime,
    userAnime: userAnime,
    guessHistory: guessHistory,
    guessFeaturedAnime: guessFeaturedAnime,
  };
};
