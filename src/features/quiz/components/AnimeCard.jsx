import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Card, CardMedia, CardContent, Typography, Stack, Chip } from '@mui/material';

import { getTitleByPreference } from '../utils/get-title-by-preference';
import { getReadableSource } from '../utils/get-readable-source';
import { getMainStudiosNames } from '../utils/get-main-studios-names';
import { getOrDefault } from '../utils/get-or-default';

const AnimeCard = forwardRef(({ anime, language, ...rest }, ref) => {
  const { coverImage, format, episodes, seasonYear, season, genres } = anime;

  const title = getTitleByPreference(anime.title, language);
  const source = anime.source && getReadableSource(anime.source);
  const studios = anime.studios.edges && getMainStudiosNames(anime.studios.edges).join(', ');

  return (
    <Card sx={{ display: 'flex' }} ref={ref} {...rest}>
      <CardMedia component="img" alt={title} image={coverImage.large} sx={{ width: 96 }} />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {getOrDefault(source)} | {getOrDefault(format)} | {episodes} episodes
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {getOrDefault(season)} {getOrDefault(seasonYear)} | {getOrDefault(studios)}
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
