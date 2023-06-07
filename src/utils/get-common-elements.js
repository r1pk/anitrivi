export const getCommonElements = (reference, target, selector) => {
  return reference.filter((element) => target.some((other) => selector(element) === selector(other)));
};
