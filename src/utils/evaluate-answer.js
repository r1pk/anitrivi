import { findCommonElements } from './find-common-elements';

export const EVALUATION = {
  CORRECT: 'correct',
  HIGHER: 'higher',
  LOWER: 'lower',
  PARTIAL: 'partial',
  INCORRECT: 'incorrect',
  UNKNOWN: 'unknown',
};

export const evaluteNumbers = (reference, target) => {
  const evaluations = [EVALUATION.LOWER, EVALUATION.CORRECT, EVALUATION.HIGHER];
  const evaluationIndex = Math.sign(reference - target) + 1;

  return evaluations[evaluationIndex];
};

export const evaluateStrings = (reference, target) => {
  if (reference === target) {
    return EVALUATION.CORRECT;
  }

  return EVALUATION.INCORRECT;
};

export const evaluatePrimitiveValues = (reference, target) => {
  if (reference === null) {
    return EVALUATION.UNKNOWN;
  }

  if (target === null) {
    return EVALUATION.INCORRECT;
  }

  if (typeof reference === 'number') {
    return evaluteNumbers(reference, target);
  }

  if (typeof reference === 'string') {
    return evaluateStrings(reference, target);
  }
};

export const evaluateArrays = (selector, reference, target) => {
  const commonElements = findCommonElements(reference, target, selector);
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
};

export const evaluateStudios = (reference, target) => {
  if (reference.length === 0) {
    return EVALUATION.UNKNOWN;
  }

  if (target.length === 0) {
    return EVALUATION.INCORRECT;
  }

  return evaluateArrays((studio) => studio.node.id, reference, target);
};

export const evaluateAnswer = (reference, target) => {
  const evaluation = {
    anime: evaluateStrings(reference.id, target.id),
  };
  const KEYS_WITH_PRIMITIVE_VALUES = ['format', 'season', 'source', 'episodes', 'averageScore', 'seasonYear'];

  for (const key of KEYS_WITH_PRIMITIVE_VALUES) {
    evaluation[key] = evaluatePrimitiveValues(reference[key], target[key]);
  }

  evaluation.studios = evaluateStudios(
    reference.studios.edges.filter((studio) => studio.isMain),
    target.studios.edges.filter((studio) => studio.isMain)
  );

  return evaluation;
};
