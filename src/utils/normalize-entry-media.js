export const normalizeEntryMedia = (media) => {
  return Object.assign({}, media, {
    format: media.format && media.format.replace(/_/g, ' '),
    source: media.source && media.source.replace(/_/g, ' '),
    studios: {
      edges: media.studios.edges.filter((edge) => edge.isMain),
    },
  });
};
