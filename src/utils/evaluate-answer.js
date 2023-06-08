import { fallbackDecorator } from './fallback-decorator';
import { getCommonElements } from './get-common-elements';

export const EVALUATION = {
  CORRECT: 'correct',
  HIGHER: 'higher',
  LOWER: 'lower',
  PARTIAL: 'partial',
  INCORRECT: 'incorrect',
  UNKNOWN: 'unknown',
};

const preliminaryEvaluation = (reference, target) => {
  const isReferenceNullOrEmpty = reference === null || (Array.isArray(reference) && reference.length === 0);
  const isTargetNullOrEmpty = target === null || (Array.isArray(target) && target.length === 0);

  if (isReferenceNullOrEmpty) {
    return EVALUATION.UNKNOWN;
  }

  if (isTargetNullOrEmpty) {
    return EVALUATION.INCORRECT;
  }

  return null;
};

const evaluateStrings = fallbackDecorator(preliminaryEvaluation, (reference, target) => {
  if (reference === target) {
    return EVALUATION.CORRECT;
  }

  return EVALUATION.INCORRECT;
});

const evaluateNumbers = fallbackDecorator(preliminaryEvaluation, (reference, target) => {
  const evaluations = [EVALUATION.LOWER, EVALUATION.CORRECT, EVALUATION.HIGHER];
  const evaluationIndex = Math.sign(reference - target) + 1;

  return evaluations[evaluationIndex];
});

const evaluateArrays = fallbackDecorator(preliminaryEvaluation, (reference, target, selector) => {
  const commonElements = getCommonElements(reference, target, selector);
  const isEachLengthEqual = [reference.length, commonElements.length, target.length].every(
    (length, _, lengths) => length === lengths[0]
  );

  if (isEachLengthEqual) {
    return EVALUATION.CORRECT;
  }

  if (commonElements.length > 0) {
    return EVALUATION.PARTIAL;
  }

  return EVALUATION.INCORRECT;
});

export const evaluateAnswer = (reference, target) => {
  const evaluation = {
    anime: evaluateStrings(reference.id, target.id),
    format: evaluateStrings(reference.format, target.format),
    season: evaluateStrings(reference.season, target.season),
    source: evaluateStrings(reference.source, target.source),
    episodes: evaluateNumbers(reference.episodes, target.episodes),
    averageScore: evaluateNumbers(reference.averageScore, target.averageScore),
    seasonYear: evaluateNumbers(reference.seasonYear, target.seasonYear),
    studios: evaluateArrays(reference.studios.edges, target.studios.edges, (edge) => edge.node.id),
  };

  return evaluation;
};
