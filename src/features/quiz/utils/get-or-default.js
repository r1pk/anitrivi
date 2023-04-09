export const getOrDefault = (value, fallback = 'N/A') => {
  if (value || value === 0) {
    return value;
  }

  return fallback;
};
