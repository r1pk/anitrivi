export const getTitleByPreference = (title, preference = 'english') => {
  return title[preference] || title.english || title.romaji || title.native;
};
