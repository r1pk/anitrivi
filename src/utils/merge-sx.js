export const mergeSx = (...styles) => {
  return styles.reduce((accumulator, sx) => {
    if (sx) {
      return accumulator.concat(sx);
    }

    return accumulator;
  }, []);
};
