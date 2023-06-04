import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Box, Paper, Stack, Typography } from '@mui/material';

import Chip from '@/components/common/Chip';

import { getOrDefault } from '@/utils/get-or-default';
import { getTitleByPreference } from '@/utils/get-title-by-preference';
import { mergeSx } from '@/utils/merge-sx';

const AnimeCard = forwardRef(({ sx, anime, language, ...rest }, ref) => {
  const title = getTitleByPreference(anime.title, language);
  const studios = anime.studios.edges.map((edge) => edge.node.name).join(', ');

  const items = [
    { label: 'Source', value: getOrDefault(anime.source) },
    { label: 'Format', value: getOrDefault(anime.format) },
    { label: 'Episodes', value: getOrDefault(anime.episodes) },
    { label: 'Season', value: `${getOrDefault(anime.season)} ${getOrDefault(anime.seasonYear)}` },
    { label: 'Average Score', value: `${getOrDefault(anime.averageScore)}%` },
  ];

  return (
    <Box sx={mergeSx({ display: 'flex' }, sx)} ref={ref} {...rest}>
      <Box sx={{ position: 'relative', display: 'flex', borderRadius: 1, overflow: 'hidden' }}>
        <Box component="img" alt={title} src={anime.coverImage.large} sx={{ width: { xs: 150, md: 165 } }} />
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
            {items.map(({ label, value }) => (
              <Stack key={label} direction="row" gap={0.5} sx={{ alignItems: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  {label}:
                </Typography>
                <Typography variant="body2">{value}</Typography>
              </Stack>
            ))}
          </Stack>
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
            {anime.genres.slice(0, 3).map((genre) => (
              <Chip key={genre} color="#636e72" label={genre} sx={{ flex: '1 0 45%', textAlign: 'center' }} />
            ))}
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
});

AnimeCard.displayName = 'AnimeCard';
AnimeCard.propTypes = {
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
    coverImage: PropTypes.shape({
      large: PropTypes.string,
    }).isRequired,
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
  language: PropTypes.oneOf(['english', 'romaji', 'native']),
};

export default AnimeCard;
