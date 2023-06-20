import { useEffect, useState } from 'react';

import { EVALUATION, evaluateAnime } from '@/utils/evaluate-anime';

export const useQuiz = ({ series, seed }) => {
  const [isReady, setIsReady] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [featuredAnime, setFeaturedAnime] = useState(null);
  const [guesses, setGuesses] = useState([]);

  const isRequirementFulfilled = series?.length > 0;

  useEffect(
    function resetQuizStates() {
      setIsReady(false);
      setIsFinished(false);

      setFeaturedAnime(null);
      setGuesses([]);
    },
    [seed]
  );

  useEffect(
    function pickFeaturedAnime() {
      if (!isRequirementFulfilled) {
        return;
      }

      const sin = Math.sin(seed) * 10000;
      const randomFraction = sin - Math.floor(sin);
      const randomIndex = Math.floor(randomFraction * series.length);

      setFeaturedAnime(series[randomIndex]);
      setIsReady(true);
    },
    [isRequirementFulfilled, series, seed]
  );

  const checkGuess = (anime) => {
    const evaluation = evaluateAnime(featuredAnime, anime);
    const guess = { anime: anime, evaluation: evaluation };

    if (evaluation.anime === EVALUATION.CORRECT) {
      setIsFinished(true);
    }

    setGuesses((prev) => [guess, ...prev]);
  };

  const restore = (animeIds) => {
    for (const animeId of animeIds) {
      const anime = series.find((anime) => anime.id === animeId);

      if (anime) {
        checkGuess(anime);
      }
    }
  };

  return {
    isReady: isReady,
    isFinished: isFinished,
    isRequirementFulfilled: isRequirementFulfilled,

    seed: seed,
    series: series,

    featuredAnime: featuredAnime,
    guesses: guesses,

    checkGuess: checkGuess,
    restore: restore,
  };
};
