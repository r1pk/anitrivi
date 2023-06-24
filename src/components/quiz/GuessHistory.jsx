import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Fade, Stack, Typography } from '@mui/material';

import PanelCard from '@/components/misc/PanelCard';

import GuessEvaluationCard from './GuessEvaluationCard';

const GuessHistory = forwardRef(({ guesses, ...rest }, ref) => {
  return (
    <PanelCard title={`Guess History (${guesses.length})`} ref={ref} {...rest}>
      <Stack spacing={1}>
        {guesses.length === 0 && (
          <Typography variant="button" color="text.secondary" sx={{ alignSelf: 'center', py: 2 }}>
            No guesses yet
          </Typography>
        )}
        {guesses.map((guess, index) => (
          <Fade key={index} in={true}>
            <GuessEvaluationCard elevation={2} anime={guess.anime} evaluation={guess.evaluation} />
          </Fade>
        ))}
      </Stack>
    </PanelCard>
  );
});

GuessHistory.displayName = 'GuessHistory';
GuessHistory.propTypes = {
  guesses: PropTypes.arrayOf(
    PropTypes.shape({
      anime: PropTypes.object.isRequired,
      evaluation: PropTypes.object.isRequired,
    })
  ).isRequired,
};

export default GuessHistory;
