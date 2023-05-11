import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

import AnimeCard from './AnimeCard';

const QuizSummaryCard = forwardRef(({ anime, attempts, language, ...rest }, ref) => {
  return (
    <Card ref={ref} {...rest}>
      <CardContent
        sx={{
          backgroundImage: 'url(/assets/green-waves.svg)',
          backgroundSize: 'cover',
        }}
      >
        <Stack sx={{ alignItems: 'center' }}>
          <Typography variant="h4" component="span">
            You guessed right!
          </Typography>
          <Typography variant="button" color="text.secondary" component="span">
            The correct answer is:
          </Typography>
          <Box sx={{ my: 2 }}>
            <AnimeCard anime={anime} language={language} />
          </Box>
          <Typography variant="button" color="text.secondary" component="span">
            Number of attempts: {attempts}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
});

QuizSummaryCard.displayName = 'QuizSummaryCard';

QuizSummaryCard.propTypes = {
  anime: PropTypes.object.isRequired,
  attempts: PropTypes.number.isRequired,
  language: PropTypes.oneOf(['english', 'romaji', 'native']),
};

export default QuizSummaryCard;
