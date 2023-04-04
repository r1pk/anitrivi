import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Card, CardMedia, CardContent, Stack, Typography, Chip } from '@mui/material';

import { getTitleByPreference } from '../utils/get-title-by-preference';
import { getMainStudiosNames } from '../utils/get-main-studios-names';

const AnimeCard = forwardRef(({ anime, language, ...rest }, ref) => {
  const { coverImage, format, episodes, seasonYear, season, genres } = anime;

  const title = getTitleByPreference(anime.title, language);
  const source = anime.source?.replace('_', ' ');
  const studios = getMainStudiosNames(anime.studios.edges);

  return (
    <Card sx={{ display: 'flex' }} ref={ref} {...rest}>
      <CardMedia component="img" alt={title} image={coverImage.large} sx={{ width: 96 }} />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {source} | {format} | {episodes} episodes
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {season} {seasonYear} | {studios.join(', ')}
        </Typography>
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, mt: 1 }}>
          {genres.map((genre) => (
            <Chip size="small" key={genre} label={genre} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
});

AnimeCard.displayName = 'AnimeCard';

AnimeCard.propTypes = {
  anime: PropTypes.object.isRequired,
  language: PropTypes.string,
};

export default AnimeCard;
