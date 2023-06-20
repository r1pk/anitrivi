import { useEffect, useState } from 'react';

import { EVALUATION, evaluateAnime } from '@/utils/evaluate-anime';

export const useQuiz = ({ series, seed }) => {
  const [isReady, setIsReady] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [anime, setAnime] = useState(null);
  const [guesses, setGuesses] = useState([]);

  const isRequirementFulfilled = series?.length > 0;

  useEffect(
    function resetQuizStates() {
      setIsReady(false);
      setIsFinished(false);

      setAnime(null);
      setGuesses([]);
    },
    [seed]
  );

  useEffect(
    function pickRandomAnime() {
      if (!isRequirementFulfilled) {
        return;
      }

      const sin = Math.sin(seed) * 10000;
      const randomFraction = sin - Math.floor(sin);
      const randomIndex = Math.floor(randomFraction * series.length);

      setAnime(series[randomIndex]);
      setIsReady(true);
    },
    [isRequirementFulfilled, series, seed]
  );

  const guessAnime = (answer) => {
    const evaluation = evaluateAnime(anime, answer);
    const guess = { anime: answer, evaluation: evaluation };

    if (evaluation.anime === EVALUATION.CORRECT) {
      setIsFinished(true);
    }

    setGuesses((prev) => [guess, ...prev]);
  };

  const restoreGuesses = (animeIds) => {
    for (const animeId of animeIds) {
      const answer = series.find((anime) => anime.id === animeId);

      if (answer) {
        guessAnime(answer);
      }
    }
  };

  return {
    isReady: isReady,
    isFinished: isFinished,
    isRequirementFulfilled: isRequirementFulfilled,

    seed: seed,
    series: series,

    anime: anime,
    guesses: guesses,

    guessAnime: guessAnime,
    restoreGuesses: restoreGuesses,
  };
};
