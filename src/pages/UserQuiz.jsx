import { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Unstable_Grid2 as Grid, Stack, Box, Typography, Fade } from '@mui/material';

import PageContainer from '@/components/PageContainer';
import BrandHeader from '@/components/BrandHeader';
import PanelCard from '@/components/PanelCard';

import { UserChip } from '@/features/users';
import { GuessAnimeForm, GuessEvaluationCard, QuizSummaryCard, useUserQuiz } from '@/features/quiz';

const UserQuiz = () => {
  const { userId } = useParams();
  const summaryCard = useRef(null);

  const userQuiz = useUserQuiz(userId);

  const handleGuessAnime = (entry) => {
    if (userQuiz.isReady) {
      userQuiz.guessFeaturedAnime(entry);
    }
  };

  useEffect(
    function scrollSummaryCardIntoView() {
      if (userQuiz.isFinished) {
        summaryCard.current.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [userQuiz.isFinished]
  );

  return (
    <PageContainer isLoaderVisible={!userQuiz.isReady}>
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
        <BrandHeader variant="h1" />
      </Box>

      <Grid container sx={{ justifyContent: 'center' }}>
        <Grid xs={12} sm={10} md={8} lg={6}>
          <Fade mountOnEnter unmountOnExit in={userQuiz.isFinished}>
            <Box sx={{ my: 4, px: 2 }}>
              {userQuiz.isFinished && (
                <QuizSummaryCard
                  ref={summaryCard}
                  anime={userQuiz.featuredAnime.media}
                  attempts={userQuiz.guessHistory.length}
                  language="english"
                />
              )}
            </Box>
          </Fade>
        </Grid>
      </Grid>

      <Grid container sx={{ justifyContent: 'center' }}>
        <Grid xs={12} sm={10} md={8} lg={6}>
          {userQuiz.isReady && (
            <Stack spacing={2}>
              <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
                <UserChip user={userQuiz.targetUser} />
              </Stack>
              <GuessAnimeForm options={userQuiz.availableSeries} onGuessAnime={handleGuessAnime} language="english" />
              <PanelCard title="Guess History">
                <Stack spacing={1}>
                  {userQuiz.guessHistory.length === 0 && (
                    <Typography variant="button" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                      No guesses yet
                    </Typography>
                  )}
                  {userQuiz.guessHistory.map((guess, index) => (
                    <Fade key={index} in={true}>
                      <GuessEvaluationCard
                        elevation={2}
                        anime={guess.anime}
                        evaluation={guess.evaluation}
                        language="english"
                      />
                    </Fade>
                  ))}
                </Stack>
              </PanelCard>
            </Stack>
          )}
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default UserQuiz;
