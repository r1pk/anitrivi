import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Box, Typography, Stack, Paper } from '@mui/material';

import Chip from '@/components/common/Chip';

import { getMainStudiosNames } from '@/utils/get-main-studios-names';
import { getOrDefault } from '@/utils/get-or-default';
import { getReadableSource } from '@/utils/get-readable-source';
import { getTitleByPreference } from '@/utils/get-title-by-preference';

const AnimeCard = forwardRef(({ anime, language, ...rest }, ref) => {
  const { coverImage, format, episodes, seasonYear, season, genres } = anime;

  const title = getTitleByPreference(anime.title, language);
  const source = anime.source && getReadableSource(anime.source);
  const studios = anime.studios.edges && getMainStudiosNames(anime.studios.edges).join(', ');

  const informations = [
    { label: 'Source', value: getOrDefault(source) },
    { label: 'Format', value: getOrDefault(format) },
    { label: 'Episodes', value: getOrDefault(episodes) },
    { label: 'Season', value: `${getOrDefault(season)} ${getOrDefault(seasonYear)}` },
    { label: 'Average Score', value: `${getOrDefault(anime.averageScore)}%` },
  ];

  return (
    <Box sx={{ display: 'flex' }} ref={ref} {...rest}>
      <Box sx={{ position: 'relative', display: 'flex', borderRadius: 1, overflow: 'hidden' }}>
        <Box component="img" alt={title} src={coverImage.large} sx={{ width: { xs: 150, md: 165 } }} />
        <Box sx={{ position: 'absolute', alignSelf: 'flex-end', width: 1, p: 1, backgroundColor: '#121212cc' }}>
          <Stack gap={1}>
            <Typography variant="body2">{title}</Typography>
            <Typography variant="caption" color="text.secondary">
              {studios}
            </Typography>
          </Stack>
        </Box>
      </Box>
      <Paper sx={{ flex: 1, my: { xs: 1, md: 2 }, p: 2, borderRadius: ({ spacing }) => spacing(0, 1, 1, 0) }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: 1, gap: 1 }}>
          <Stack>
            {informations.map(({ label, value }) => (
              <Stack key={label} direction="row" gap={0.5} sx={{ alignItems: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  {label}:
                </Typography>
                <Typography variant="body2">{value}</Typography>
              </Stack>
            ))}
          </Stack>
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
            {genres.slice(0, 3).map((genre) => (
              <Chip key={genre} color="#636e72" style={{ flex: '1 0 40%', textAlign: 'center' }}>
                <Typography variant="caption" component="div">
                  {genre}
                </Typography>
              </Chip>
            ))}
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
});

AnimeCard.displayName = 'AnimeCard';

AnimeCard.propTypes = {
  anime: PropTypes.object.isRequired,
  language: PropTypes.oneOf(['english', 'romaji', 'native']),
};

export default AnimeCard;
