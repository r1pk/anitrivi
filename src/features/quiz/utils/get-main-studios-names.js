export const getMainStudiosNames = (studios) => {
  const isMainStudio = (studio) => studio.isMain;
  const getStudioName = (studio) => studio.node.name;

  return studios.filter(isMainStudio).map(getStudioName);
};
