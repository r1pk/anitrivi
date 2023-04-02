import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Card, CardMedia, CardContent, Stack, Typography } from '@mui/material';

import EvaluationChip from './EvaluationChip';

const GuessEvaluationCard = forwardRef(({ anime, evaluation, ...rest }, ref) => {
  const { coverImage, format, episodes, seasonYear, season } = anime;

  const title = anime.title.english || anime.title.romaji || anime.title.native;
  const source = anime.source?.replace('_', ' ');
  const studios = anime.studios.edges.filter((edge) => edge.isMain).map((edge) => edge.node.name);

  return (
    <Card sx={{ display: 'flex' }} ref={ref} {...rest}>
      <CardMedia component="img" alt={title} image={coverImage.large} sx={{ width: 96 }} />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6">{title}</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ flexWrap: 'wrap', gap: 1, my: 1, maxWidth: 1 }}>
          <EvaluationChip label="Source" value={source} evaluation={evaluation.source} />
          <EvaluationChip label="Format" value={format} evaluation={evaluation.format} />
          <EvaluationChip label="Episodes" value={episodes} evaluation={evaluation.episodes} />
          <EvaluationChip label="Year" value={seasonYear} evaluation={evaluation.seasonYear} />
          <EvaluationChip label="Season" value={season} evaluation={evaluation.season} />
          <EvaluationChip label="Studio" value={studios.join(', ')} evaluation={evaluation.studios} />
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
    episodes: PropTypes.oneOf(['correct', 'incorrect']).isRequired,
    seasonYear: PropTypes.oneOf(['correct', 'incorrect']).isRequired,
    season: PropTypes.oneOf(['correct', 'incorrect']).isRequired,
    studios: PropTypes.oneOf(['correct', 'partial', 'incorrect']).isRequired,
  }).isRequired,
};

export default GuessEvaluationCard;
