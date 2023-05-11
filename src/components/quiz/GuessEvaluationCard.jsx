import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Box, Card, CardContent, Stack, Typography, alpha, useTheme } from '@mui/material';

import { getMainStudiosNames } from '@/utils/get-main-studios-names';
import { getTitleByPreference } from '@/utils/get-title-by-preference';
import { removeUnderscore } from '@/utils/remove-underscore';

import EvaluationChip from './EvaluationChip';

const GuessEvaluationCard = forwardRef(({ isCorrect, anime, evaluation, language, ...rest }, ref) => {
  const { bannerImage, episodes, averageScore, seasonYear, season } = anime;

  const title = getTitleByPreference(anime.title, language);
  const format = anime.format && removeUnderscore(anime.format);
  const source = anime.source && removeUnderscore(anime.source);
  const studios = anime.studios.edges && getMainStudiosNames(anime.studios.edges).join(', ');

  const evaluations = [
    { label: 'Format', value: format, evaluation: evaluation.format },
    { label: 'Episodes', value: episodes, evaluation: evaluation.episodes },
    { label: 'Source', value: source, evaluation: evaluation.source },
    { label: 'Average Score', value: averageScore, evaluation: evaluation.averageScore },
    { label: 'Season', value: season, evaluation: evaluation.season },
    { label: 'Year', value: seasonYear, evaluation: evaluation.seasonYear },
    { label: 'Studio', value: studios, evaluation: evaluation.studios },
  ];

  const { palette } = useTheme();
  const backgroundColor = alpha(palette.background.paper, 0.8);
  const evaluationColor = isCorrect ? alpha(palette.evaluation.correct, 0.5) : alpha(palette.evaluation.incorrect, 0.5);
  const background = `linear-gradient(${backgroundColor}, ${backgroundColor}), url(${bannerImage}) center/cover no-repeat`;

  return (
    <Card sx={{ position: 'relative', display: 'flex' }} ref={ref} {...rest}>
      <CardContent sx={{ flex: 1, zIndex: 1, background: background }}>
        <Typography variant="button" gutterBottom>
          {title}
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ 'flexWrap': 'wrap', '& > *': { flex: '1 0 45%' } }}>
          {evaluations.map(({ label, value, evaluation }) => (
            <EvaluationChip key={label} label={label} value={value} evaluation={evaluation} />
          ))}
        </Stack>
      </CardContent>
      <Box sx={{ alignSelf: 'stretch', width: 4, backgroundColor: evaluationColor }} />
    </Card>
  );
});

GuessEvaluationCard.displayName = 'GuessEvaluationCard';

GuessEvaluationCard.propTypes = {
  isCorrect: PropTypes.bool.isRequired,
  anime: PropTypes.object.isRequired,
  evaluation: PropTypes.shape({
    source: PropTypes.string.isRequired,
    format: PropTypes.string.isRequired,
    episodes: PropTypes.string.isRequired,
    averageScore: PropTypes.string.isRequired,
    seasonYear: PropTypes.string.isRequired,
    season: PropTypes.string.isRequired,
    studios: PropTypes.string.isRequired,
  }).isRequired,
  language: PropTypes.oneOf(['english', 'romaji', 'native']),
};

export default GuessEvaluationCard;
