import { useEffect, useState } from 'react';

import ls from 'localstorage-slim';

import { EVALUATION, evaluateAnime } from '@/utils/evaluate-anime';

export const useQuiz = ({ id, series, seed }) => {
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

  useEffect(
    function restorePersistedGuesses() {
      if (!featuredAnime) {
        return;
      }

      const storage = ls.get(id) || {};
      const animeIds = storage[seed] || [];

      setGuesses([]);
      animeIds.forEach((animeId) => {
        const anime = series.find((anime) => anime.id === animeId);

        if (anime) {
          const evaluation = evaluateAnime(featuredAnime, anime);
          const guess = { anime: anime, evaluation: evaluation };

          if (evaluation.anime === EVALUATION.CORRECT) {
            setIsFinished(true);
          }

          setGuesses((prev) => [guess, ...prev]);
        }
      });
    },
    [id, series, seed, featuredAnime]
  );

  const persistGuess = (anime) => {
    const currentStorage = ls.get(id) || {};
    const updatedStorage = Object.assign({}, currentStorage, {
      [seed]: [].concat(currentStorage[seed] || [], anime.id),
    });

    ls.set(id, updatedStorage);
  };

  const checkGuess = (anime) => {
    const evaluation = evaluateAnime(featuredAnime, anime);
    const guess = { anime: anime, evaluation: evaluation };

    if (evaluation.anime === EVALUATION.CORRECT) {
      setIsFinished(true);
    }

    setGuesses((prev) => [guess, ...prev]);
    persistGuess(anime);
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
  };
};
