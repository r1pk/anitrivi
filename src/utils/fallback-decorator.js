export const fallbackDecorator = (decorator, fallback) => {
  return (...args) => {
    const result = decorator(...args);

    if (result === null) {
      return fallback(...args);
    }

    return result;
  };
};
