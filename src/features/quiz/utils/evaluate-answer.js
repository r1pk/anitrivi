export const compareSimpleValues = (reference, target) => {
  return reference === target ? 'correct' : 'incorrect';
};

export const compareSimpleArrays = (reference, target) => {
  if (target.length > 0 && target.every((item) => reference.includes(item))) {
    return 'correct';
  }

  if (target.length > 0 && target.some((item) => reference.includes(item))) {
    return 'partial';
  }

  return 'incorrect';
};

export const evaluateAnswer = (reference, target) => {
  const result = {};

  // strict comparision for fields with simple values
  ['id', 'format', 'episodes', 'season', 'seasonYear', 'source'].forEach((key) => {
    result[key] = compareSimpleValues(reference[key], target[key]);
  });

  // modify similar arrays with different elements in the same way
  const [referenceStudiosIds, targetStudiosIds] = [reference.studios.edges, target.studios.edges].map((array) => {
    return array.filter((edge) => edge.isMain).map((edge) => edge.node.id);
  });

  // custom comparison for previously modified arrays
  result.studios = compareSimpleArrays(referenceStudiosIds, targetStudiosIds);

  return result;
};
