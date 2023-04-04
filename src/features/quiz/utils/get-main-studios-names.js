export const getMainStudiosNames = (studios) => {
  return studios.filter((studio) => studio.isMain).map((studio) => studio.node.name);
};
