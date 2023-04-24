import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Card, CardContent, Stack, Typography, useTheme, alpha } from '@mui/material';

import { getTitleByPreference } from '@/utils/get-title-by-preference';
import { getReadableSource } from '@/utils/get-readable-source';
import { getMainStudiosNames } from '@/utils/get-main-studios-names';

import EvaluationChip from './EvaluationChip';

const GuessEvaluationCard = forwardRef(({ anime, evaluation, language, ...rest }, ref) => {
  const { bannerImage, format, episodes, averageScore, seasonYear, season } = anime;

  const title = getTitleByPreference(anime.title, language);
  const source = anime.source && getReadableSource(anime.source);
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
  const backgroundColor = alpha(palette.background.paper, 0.9);
  const background = `linear-gradient(${backgroundColor}, ${backgroundColor}), url(${bannerImage}) center/cover no-repeat`;

  return (
    <Card sx={{ position: 'relative', display: 'flex' }} ref={ref} {...rest}>
      <CardContent sx={{ flex: 1, zIndex: 1, background: background }}>
        <Typography variant="overline">{title}</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ 'flexWrap': 'wrap', '& > *': { flex: '1 0 45%' } }}>
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
