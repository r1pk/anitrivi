import { useEffect, useRef, useState } from 'react';

import { useParams } from 'react-router-dom';

import { Settings } from '@mui/icons-material';
import { Alert, Box, Dialog, Fade, Unstable_Grid2 as Grid, IconButton, Stack } from '@mui/material';

import SettingsContextProvider from '@/contexts/Settings';

import BrandHeader from '@/components/misc/BrandHeader';
import PageContainer from '@/components/misc/PageContainer';
import GuessAnimeForm from '@/components/quiz/GuessAnimeForm';
import GuessHistory from '@/components/quiz/GuessHistory';
import NextAnimeCountdown from '@/components/quiz/NextAnimeCountdown';
import SeedControlPanel from '@/components/quiz/SeedControlPanel';
import SettingsForm from '@/components/quiz/SettingsForm';
import SummaryCard from '@/components/quiz/SummaryCard';
import UserChip from '@/components/users/UserChip';

import { useUserQuiz } from '@/hooks/useUserQuiz';

const UserQuiz = () => {
  const { userId } = useParams();
  const summaryCard = useRef(null);

  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);

  const quiz = useUserQuiz({ userId: userId });

  const handleOpenSettingsDialog = () => {
    setIsSettingsDialogOpen(true);
  };

  const handleCloseSettingsDialog = () => {
    setIsSettingsDialogOpen(false);
  };

  const handleSubmitSettings = () => {
    setIsSettingsDialogOpen(false);
  };

  useEffect(
    function scrollSummaryCardIntoView() {
      if (quiz.isFinished) {
        summaryCard.current.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [quiz.isFinished]
  );

  return (
    <SettingsContextProvider>
      <PageContainer isLoaderVisible={quiz.isInitialLoading}>
        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
          <Grid xs={12}>
            <Stack spacing={1} sx={{ alignItems: 'center' }}>
              <BrandHeader variant="h1" />
              <NextAnimeCountdown />
            </Stack>
          </Grid>

          {!(quiz.isInitialLoading || quiz.isRequirementFulfilled) && (
            <Grid xs={12}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Alert severity="error">User doesn't have enough completed anime to play the quiz</Alert>
              </Box>
            </Grid>
          )}

          {quiz.isFinished && (
            <Grid container xs={12} sx={{ justifyContent: 'center' }}>
              <Grid xs={12} sm={10} md={8} lg={6}>
                <Fade mountOnEnter unmountOnExit in={quiz.isFinished}>
                  <SummaryCard ref={summaryCard} anime={quiz.featuredAnime} attempts={quiz.guesses.length} />
                </Fade>
              </Grid>
            </Grid>
          )}

          {quiz.isReady && (
            <>
              <Grid container xs={12} sx={{ justifyContent: 'center' }}>
                <Grid xs={12} sm={10} md={8} lg={6}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Box sx={{ flexGrow: 1 }} />
                    <UserChip user={quiz.user} />
                    <IconButton onClick={handleOpenSettingsDialog}>
                      <Settings />
                    </IconButton>
                  </Stack>
                </Grid>
              </Grid>

              {!quiz.isFinished && (
                <Grid container xs={12} sx={{ justifyContent: 'center' }}>
                  <Grid xs={12} sm={10} md={8} lg={6}>
                    <GuessAnimeForm options={quiz.series} onSubmit={quiz.checkGuess} />
                  </Grid>
                </Grid>
              )}

              <Grid container xs={12} sx={{ justifyContent: 'center' }}>
                <Grid xs={12} sm={10} md={8} lg={6}>
                  <GuessHistory guesses={quiz.guesses} />
                </Grid>
              </Grid>

              <Grid container xs={12} sx={{ justifyContent: 'center' }}>
                <Grid xs={12} sm={10} md={8} lg={6}>
                  <SeedControlPanel
                    seed={quiz.seed}
                    onChangeSeed={quiz.changeSeed}
                    onRandomizeSeed={quiz.randomizeSeed}
                    sx={{ color: 'text.secondary' }}
                  />
                </Grid>
              </Grid>
            </>
          )}
        </Grid>

        <Dialog fullWidth maxWidth="xs" open={isSettingsDialogOpen} onClose={handleCloseSettingsDialog}>
          <SettingsForm onCancel={handleCloseSettingsDialog} onSubmit={handleSubmitSettings} />
        </Dialog>
      </PageContainer>
    </SettingsContextProvider>
  );
};

export default UserQuiz;
