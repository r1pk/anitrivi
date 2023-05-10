import { useState, useEffect } from 'react';

import { evaluateAnswer } from '@/utils/evaluate-answer';

export const useQuiz = ({ series, seed }) => {
  const [isReady, setIsReady] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [anime, setAnime] = useState(null);
  const [guesses, setGuesses] = useState([]);

  const isRequirementFulfilled = series?.length > 0;

  useEffect(
    function pickRandomAnime() {
      if (!isRequirementFulfilled) return;

      const sin = Math.sin(seed) * 10000;
      const randomFraction = sin - Math.floor(sin);
      const randomIndex = Math.floor(randomFraction * series.length);

      setAnime(series[randomIndex]);
      setIsReady(true);
    },
    [isRequirementFulfilled, series, seed]
  );

  const guessAnime = (answer) => {
    const isCorrect = anime.mediaId === answer.mediaId;
    const evaluation = evaluateAnswer(anime.media, answer.media);

    setIsFinished(isCorrect);
    setGuesses((prev) => [{ isCorrect: isCorrect, anime: answer.media, evaluation: evaluation }, ...prev]);
  };

  const restoreGuesses = (animeIds) => {
    for (const animeId of animeIds) {
      const answer = series.find((anime) => anime.media.id === animeId);

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
