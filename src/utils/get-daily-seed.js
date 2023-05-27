export const getDailySeed = () => {
  const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;

  return Math.floor(Date.now() / MILLISECONDS_IN_DAY);
};
