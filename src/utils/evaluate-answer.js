import { findCommonElements } from './find-common-elements';

export const compareNumbers = (reference, target) => {
  if (reference === null) {
    return 'unknown';
  }

  if (target === null) {
    return 'incorrect';
  }

  if (reference > target) {
    return 'higher';
  }

  if (reference < target) {
    return 'lower';
  }

  return 'correct';
};

export const compareStrings = (reference, target) => {
  if (reference === null) {
    return 'unknown';
  }

  if (reference === target) {
    return 'correct';
  }

  return 'incorrect';
};

export const compareArrays = (selector, reference, target) => {
  const commonElements = findCommonElements(reference, target, selector);
  const lengths = [commonElements.length, reference.length, target.length];

  if (reference.length === 0) {
    return 'unknown';
  }

  if (lengths.every((length) => length === lengths[0])) {
    return 'correct';
  }

  if (commonElements.length > 0) {
    return 'partial';
  }

  return 'incorrect';
};

export const evaluateAnswer = (reference, target) => {
  const evaluation = {};

  const strings = ['id', 'format', 'season', 'source'];
  const numbers = ['episodes', 'averageScore', 'seasonYear'];

  for (const key of strings) {
    evaluation[key] = compareStrings(reference[key], target[key]);
  }

  for (const key of numbers) {
    evaluation[key] = compareNumbers(reference[key], target[key]);
  }

  evaluation.studios = compareArrays(
    (studio) => studio.node.id,
    reference.studios.edges.filter((studio) => studio.isMain),
    target.studios.edges.filter((studio) => studio.isMain)
  );

  return evaluation;
};
