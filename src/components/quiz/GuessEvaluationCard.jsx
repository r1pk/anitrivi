import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Box, Card, CardContent, Stack, Typography, alpha, useTheme } from '@mui/material';

import { useQuizSettingsContext } from '@/contexts/QuizSettings';

import { getTitleByPreference } from '@/utils/get-title-by-preference';
import { mergeSx } from '@/utils/merge-sx';

import EvaluationTag from './EvaluationTag';

const GuessEvaluationCard = forwardRef(({ sx, anime, evaluation, ...rest }, ref) => {
  const { quizSettings } = useQuizSettingsContext();

  const title = getTitleByPreference(anime.title, quizSettings.titleLanguage);
  const studios = anime.studios.edges.map((edge) => edge.node.name).join(', ');
  const genres = anime.genres.join(', ');

  const evaluations = [
    { label: 'Format', value: anime.format, evaluation: evaluation.format, inline: true },
    { label: 'Episodes', value: anime.episodes, evaluation: evaluation.episodes, inline: true },
    { label: 'Source', value: anime.source, evaluation: evaluation.source, inline: true },
    { label: 'Average Score', value: anime.averageScore, evaluation: evaluation.averageScore, inline: true },
    { label: 'Season', value: anime.season, evaluation: evaluation.season, inline: true },
    { label: 'Season Year', value: anime.seasonYear, evaluation: evaluation.seasonYear, inline: true },
    { label: 'Genres', value: genres, evaluation: evaluation.genres, inline: false },
    { label: 'Studio', value: studios, evaluation: evaluation.studios, inline: false },
  ];

  const { palette } = useTheme();
  const backgroundColor = alpha(palette.background.paper, 0.8);
  const evaluationColor = alpha(palette.evaluation[evaluation.anime], 0.5);
  const background = `linear-gradient(${backgroundColor}, ${backgroundColor}), url(${anime.bannerImage}) center/cover no-repeat`;

  return (
    <Card sx={mergeSx({ position: 'relative', display: 'flex' }, sx)} ref={ref} {...rest}>
      <CardContent sx={{ flex: 1, zIndex: 1, background: background }}>
        <Typography variant="button" gutterBottom>
          {title}
        </Typography>
        <Stack direction="row" sx={{ flexWrap: 'wrap' }}>
          {evaluations.map(({ label, value, evaluation, inline }) => (
            <EvaluationTag
              key={label}
              label={label}
              value={value}
              evaluation={evaluation}
              sx={{ flex: inline ? { xs: '1 0 100%', sm: '1 0 45%' } : '1 0 100%' }}
            />
          ))}
        </Stack>
      </CardContent>
      <Box sx={{ alignSelf: 'stretch', width: 4, backgroundColor: evaluationColor }} />
    </Card>
  );
});

GuessEvaluationCard.displayName = 'GuessEvaluationCard';
GuessEvaluationCard.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
  ]),
  anime: PropTypes.shape({
    title: PropTypes.shape({
      english: PropTypes.string,
      romaji: PropTypes.string,
      native: PropTypes.string,
    }).isRequired,
    bannerImage: PropTypes.string,
    format: PropTypes.string,
    episodes: PropTypes.number,
    averageScore: PropTypes.number,
    season: PropTypes.string,
    seasonYear: PropTypes.number,
    source: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    studios: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          isMain: PropTypes.bool.isRequired,
          node: PropTypes.shape({
            name: PropTypes.string.isRequired,
          }).isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
  evaluation: PropTypes.shape({
    anime: PropTypes.oneOf(['correct', 'incorrect', 'unknown']).isRequired,
    format: PropTypes.oneOf(['correct', 'incorrect', 'unknown']).isRequired,
    season: PropTypes.oneOf(['correct', 'incorrect', 'unknown']).isRequired,
    source: PropTypes.oneOf(['correct', 'incorrect', 'unknown']).isRequired,
    episodes: PropTypes.oneOf(['correct', 'higher', 'lower', 'incorrect', 'unknown']).isRequired,
    averageScore: PropTypes.oneOf(['correct', 'higher', 'lower', 'incorrect', 'unknown']).isRequired,
    seasonYear: PropTypes.oneOf(['correct', 'higher', 'lower', 'incorrect', 'unknown']).isRequired,
    genres: PropTypes.oneOf(['correct', 'partial', 'incorrect', 'unknown']).isRequired,
    studios: PropTypes.oneOf(['correct', 'partial', 'incorrect', 'unknown']).isRequired,
  }).isRequired,
};

export default GuessEvaluationCard;
