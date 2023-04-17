import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Card, CardMedia, CardContent, Stack, Typography } from '@mui/material';

import { getTitleByPreference } from '@/utils/get-title-by-preference';
import { getReadableSource } from '@/utils/get-readable-source';
import { getMainStudiosNames } from '@/utils/get-main-studios-names';

import EvaluationChip from './EvaluationChip';

const GuessEvaluationCard = forwardRef(({ anime, evaluation, language, ...rest }, ref) => {
  const { coverImage, format, episodes, seasonYear, season } = anime;

  const title = getTitleByPreference(anime.title, language);
  const source = anime.source && getReadableSource(anime.source);
  const studios = anime.studios.edges && getMainStudiosNames(anime.studios.edges).join(', ');

  const evaluations = [
    { label: 'Source', value: source, evaluation: evaluation.source },
    { label: 'Format', value: format, evaluation: evaluation.format },
    { label: 'Episodes', value: episodes, evaluation: evaluation.episodes },
    { label: 'Average Score', value: anime.averageScore, evaluation: evaluation.averageScore },
    { label: 'Year', value: seasonYear, evaluation: evaluation.seasonYear },
    { label: 'Season', value: season, evaluation: evaluation.season },
    { label: 'Studio', value: studios, evaluation: evaluation.studios },
  ];

  return (
    <Card sx={{ display: 'flex' }} ref={ref} {...rest}>
      <CardMedia component="img" alt={title} image={coverImage.large} sx={{ width: 96 }} />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6">{title}</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ flexWrap: 'wrap', gap: 1, my: 1 }}>
          {evaluations.map(({ label, value, evaluation }) => (
            <EvaluationChip key={label} label={label} value={value} evaluation={evaluation} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
});

GuessEvaluationCard.displayName = 'GuessEvaluationCard';

GuessEvaluationCard.propTypes = {
  anime: PropTypes.object.isRequired,
  evaluation: PropTypes.shape({
    source: PropTypes.oneOf(['correct', 'incorrect']).isRequired,
    format: PropTypes.oneOf(['correct', 'incorrect']).isRequired,
    episodes: PropTypes.oneOf(['correct', 'higher', 'lower']).isRequired,
    averageScore: PropTypes.oneOf(['correct', 'higher', 'lower']).isRequired,
    seasonYear: PropTypes.oneOf(['correct', 'higher', 'lower']).isRequired,
    season: PropTypes.oneOf(['correct', 'incorrect']).isRequired,
    studios: PropTypes.oneOf(['correct', 'partial', 'incorrect']).isRequired,
  }).isRequired,
  language: PropTypes.string,
};

export default GuessEvaluationCard;
