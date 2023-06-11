import { useEffect, useRef, useState } from 'react';

import { useParams } from 'react-router-dom';

import { Settings, Shuffle } from '@mui/icons-material';
import { Alert, Box, Button, Dialog, Fade, Unstable_Grid2 as Grid, IconButton, Stack, Typography } from '@mui/material';

import { SettingsContext } from '@/contexts/Settings';

import BrandHeader from '@/components/misc/BrandHeader';
import PageContainer from '@/components/misc/PageContainer';
import PanelCard from '@/components/misc/PanelCard';
import GuessAnimeForm from '@/components/quiz/GuessAnimeForm';
import GuessEvaluationCard from '@/components/quiz/GuessEvaluationCard';
import NextAnimeCountdown from '@/components/quiz/NextAnimeCountdown';
import SettingsForm from '@/components/quiz/SettingsForm';
import SummaryCard from '@/components/quiz/SummaryCard';
import UserChip from '@/components/users/UserChip';

import { useSettings } from '@/hooks/useSettings';
import { useUserQuiz } from '@/hooks/useUserQuiz';
import { useUserStorage } from '@/hooks/useUserStorage';

const UserQuiz = () => {
  const { userId } = useParams();
  const summaryCard = useRef(null);

  const { settings, setSettings } = useSettings();
  const { userStorage, setUserStorage } = useUserStorage({ userId: userId });
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);

  const quiz = useUserQuiz({ userId: userId });

  const handleGuessAnime = (entry) => {
    quiz.guessAnime(entry);
    setUserStorage((prev) => ({
      ...prev,
      guesses: {
        ...prev.guesses,
        [quiz.seed]: [].concat(prev.guesses[quiz.seed] || [], entry.id),
      },
    }));
  };

  const handleRestoreGuesses = () => {
    quiz.restoreGuesses(userStorage.guesses[quiz.seed]);
  };

  const handleOpenSettingsDialog = () => {
    setIsSettingsDialogOpen(true);
  };

  const handleCloseSettingsDialog = () => {
    setIsSettingsDialogOpen(false);
  };

  const handleSubmitSettings = (settings) => {
    setSettings((prev) => ({ ...prev, ...settings }));
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
    <SettingsContext.Provider value={settings}>
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
                  <SummaryCard ref={summaryCard} anime={quiz.anime} attempts={quiz.guesses.length} />
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
                    <GuessAnimeForm options={quiz.series} onSubmit={handleGuessAnime} />
                  </Grid>
                </Grid>
              )}

              <Grid container xs={12} sx={{ justifyContent: 'center' }}>
                <Grid xs={12} sm={10} md={8} lg={6}>
                  <PanelCard title={`Guess History (${quiz.guesses.length})`}>
                    <Stack spacing={1}>
                      {quiz.guesses.length === 0 && (
                        <>
                          <Typography variant="button" color="text.secondary" sx={{ alignSelf: 'center', py: 2 }}>
                            No guesses yet
                          </Typography>
                          {userStorage.guesses[quiz.seed]?.length > 0 && (
                            <Button onClick={handleRestoreGuesses} sx={{ alignSelf: 'center' }}>
                              Restore previous guesses
                            </Button>
                          )}
                        </>
                      )}
                      {quiz.guesses.map((guess, index) => (
                        <Fade key={index} in={true}>
                          <GuessEvaluationCard elevation={2} anime={guess.anime} evaluation={guess.evaluation} />
                        </Fade>
                      ))}
                    </Stack>
                  </PanelCard>
                </Grid>
              </Grid>

              <Grid container xs={12} sx={{ justifyContent: 'center' }}>
                <Grid xs={12} sm={10} md={8} lg={6}>
                  <Box color="text.secondary" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="overline" color="inherit">
                      Seed: {quiz.seed}
                    </Typography>
                    <IconButton size="small" color="inherit" onClick={quiz.randomizeSeed}>
                      <Shuffle fontSize="inherit" />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>

        <Dialog fullWidth maxWidth="xs" open={isSettingsDialogOpen} onClose={handleCloseSettingsDialog}>
          <SettingsForm defaultValues={settings} onCancel={handleCloseSettingsDialog} onSubmit={handleSubmitSettings} />
        </Dialog>
      </PageContainer>
    </SettingsContext.Provider>
  );
};

export default UserQuiz;
