const createEvaluationField = (name, label, value, evaluation, inline = true) => {
  return { name: name, label: label, value: value, evaluation: evaluation, inline: inline };
};

export const getGuessCardEvaluations = (fields, anime, evaluation) => {
  const studios = anime.studios.edges.map((edge) => edge.node.name).join(', ');
  const genres = anime.genres.join(', ');

  const evaluations = [
    createEvaluationField('format', 'Format', anime.format, evaluation.format, true),
    createEvaluationField('episodes', 'Episodes', anime.episodes, evaluation.episodes, true),
    createEvaluationField('source', 'Source', anime.source, evaluation.source, true),
    createEvaluationField('averageScore', 'Average Score', anime.averageScore, evaluation.averageScore, true),
    createEvaluationField('season', 'Season', anime.season, evaluation.season, true),
    createEvaluationField('seasonYear', 'Season Year', anime.seasonYear, evaluation.seasonYear, true),
    createEvaluationField('genres', 'Genres', genres, evaluation.genres, false),
    createEvaluationField('studios', 'Studios', studios, evaluation.studios, false),
  ];

  return evaluations.filter((evaluation) => fields.includes(evaluation.name));
};
