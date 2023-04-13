export const compareNumericValues = (reference, target) => {
  if (reference > target) {
    return 'higher';
  }

  if (reference < target) {
    return 'lower';
  }

  return 'correct';
};

export const compareSimpleValues = (reference, target) => {
  return reference === target ? 'correct' : 'incorrect';
};

export const compareSimpleArrays = (reference, target) => {
  const isReferenceIncludes = (item) => reference.includes(item);
  const isTargetEmpty = target.length === 0;

  if (isTargetEmpty) {
    return 'incorrect';
  }

  if (target.every(isReferenceIncludes)) {
    return 'correct';
  }

  if (target.some(isReferenceIncludes)) {
    return 'partial';
  }

  return 'incorrect';
};

export const evaluateAnswer = (reference, target) => {
  const result = {};

  // strict comparision for fields with simple values
  ['id', 'format', 'season', 'source'].forEach((key) => {
    result[key] = compareSimpleValues(reference[key], target[key]);
  });

  // custom comparison for fields with numeric values
  ['episodes', 'averageScore', 'seasonYear'].forEach((key) => {
    result[key] = compareNumericValues(reference[key], target[key]);
  });

  // modify similar arrays with different elements in the same way
  const isMainStudio = (studio) => studio.isMain;
  const getStudioId = (studio) => studio.node.id;

  const [referenceStudiosIds, targetStudiosIds] = [reference.studios.edges, target.studios.edges].map((array) => {
    return array.filter(isMainStudio).map(getStudioId);
  });

  // custom comparison for previously modified arrays
  result.studios = compareSimpleArrays(referenceStudiosIds, targetStudiosIds);

  return result;
};
