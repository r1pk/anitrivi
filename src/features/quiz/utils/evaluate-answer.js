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

  // custom comparison for studios by theirs ids
  result.studios = compareSimpleArrays(
    reference.studios.edges.filter((edge) => edge.isMain).map((edge) => edge.node.id),
    target.studios.edges.filter((edge) => edge.isMain).map((edge) => edge.node.id)
  );

  return result;
};