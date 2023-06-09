import { useEffect, useRef, useState } from 'react';

import { useParams } from 'react-router-dom';

import { Settings, Shuffle } from '@mui/icons-material';
import { Alert, Box, Button, Dialog, Fade, Unstable_Grid2 as Grid, IconButton, Stack, Typography } from '@mui/material';

import BrandHeader from '@/components/misc/BrandHeader';
import PageContainer from '@/components/misc/PageContainer';
import PanelCard from '@/components/misc/PanelCard';
import GuessAnimeForm from '@/components/quiz/GuessAnimeForm';
import GuessEvaluationCard from '@/components/quiz/GuessEvaluationCard';
import NextAnimeCountdown from '@/components/quiz/NextAnimeCountdown';
import SettingsForm from '@/components/quiz/SettingsForm';
import SummaryCard from '@/components/quiz/SummaryCard';
import UserChip from '@/components/users/UserChip';

import { useUserQuiz } from '@/hooks/useUserQuiz';
import { useUserStorage } from '@/hooks/useUserStorage';

const UserQuiz = () => {
  const { userId } = useParams();
  const summaryCard = useRef(null);

  const userQuiz = useUserQuiz({ userId: userId });
  const { userStorage, setUserStorage } = useUserStorage({ userId: userId });
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);

  const handleGuessAnime = (entry) => {
    userQuiz.guessAnime(entry);
    setUserStorage((prev) => ({
      ...prev,
      guesses: {
        ...prev.guesses,
        [userQuiz.seed]: [].concat(prev.guesses[userQuiz.seed] || [], entry.id),
      },
    }));
  };

  const handleRestoreGuesses = () => {
    userQuiz.restoreGuesses(userStorage.guesses[userQuiz.seed]);
  };

  const handleOpenSettingsDialog = () => {
    setIsSettingsDialogOpen(true);
  };

  const handleCloseSettingsDialog = () => {
    setIsSettingsDialogOpen(false);
  };

  const handleSubmitSettings = (settings) => {
    setUserStorage((prev) => ({
      ...prev,
      settings: settings,
    }));
    setIsSettingsDialogOpen(false);
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
    <PageContainer isLoaderVisible={userQuiz.isInitialLoading}>
      <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
        <Grid xs={12}>
          <Stack spacing={1} sx={{ alignItems: 'center' }}>
            <BrandHeader variant="h1" />
            <NextAnimeCountdown />
          </Stack>
        </Grid>

        {!(userQuiz.isInitialLoading || userQuiz.isRequirementFulfilled) && (
          <Grid xs={12}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Alert severity="error">User doesn't have enough completed anime to play the quiz</Alert>
            </Box>
          </Grid>
        )}

        {userQuiz.isFinished && (
          <Grid container xs={12} sx={{ justifyContent: 'center' }}>
            <Grid xs={12} sm={10} md={8} lg={6}>
              <Fade mountOnEnter unmountOnExit in={userQuiz.isFinished}>
                <SummaryCard
                  ref={summaryCard}
                  anime={userQuiz.anime}
                  attempts={userQuiz.guesses.length}
                  language={userStorage.settings.language}
                />
              </Fade>
            </Grid>
          </Grid>
        )}

        {userQuiz.isReady && (
          <>
            <Grid container xs={12} sx={{ justifyContent: 'center' }}>
              <Grid xs={12} sm={10} md={8} lg={6}>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <Box sx={{ flexGrow: 1 }} />
                  <UserChip user={userQuiz.user} />
                  <IconButton onClick={handleOpenSettingsDialog}>
                    <Settings />
                  </IconButton>
                </Stack>
              </Grid>
            </Grid>

            {!userQuiz.isFinished && (
              <Grid container xs={12} sx={{ justifyContent: 'center' }}>
                <Grid xs={12} sm={10} md={8} lg={6}>
                  <GuessAnimeForm
                    options={userQuiz.series}
                    language={userStorage.settings.language}
                    onSubmit={handleGuessAnime}
                  />
                </Grid>
              </Grid>
            )}

            <Grid container xs={12} sx={{ justifyContent: 'center' }}>
              <Grid xs={12} sm={10} md={8} lg={6}>
                <PanelCard title={`Guess History (${userQuiz.guesses.length})`}>
                  <Stack spacing={1}>
                    {userQuiz.guesses.length === 0 && (
                      <>
                        <Typography variant="button" color="text.secondary" sx={{ alignSelf: 'center', py: 2 }}>
                          No guesses yet
                        </Typography>
                        {userStorage.guesses[userQuiz.seed]?.length > 0 && (
                          <Button onClick={handleRestoreGuesses} sx={{ alignSelf: 'center' }}>
                            Restore previous guesses
                          </Button>
                        )}
                      </>
                    )}
                    {userQuiz.guesses.map((guess, index) => (
                      <Fade key={index} in={true}>
                        <GuessEvaluationCard
                          elevation={2}
                          anime={guess.anime}
                          evaluation={guess.evaluation}
                          language={userStorage.settings.language}
                        />
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
                    Seed: {userQuiz.seed}
                  </Typography>
                  <IconButton size="small" color="inherit" onClick={userQuiz.randomizeSeed}>
                    <Shuffle fontSize="inherit" />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>

      <Dialog fullWidth maxWidth="xs" open={isSettingsDialogOpen} onClose={handleCloseSettingsDialog}>
        <SettingsForm
          defaultValues={userStorage.settings}
          onCancel={handleCloseSettingsDialog}
          onSubmit={handleSubmitSettings}
        />
      </Dialog>
    </PageContainer>
  );
};

export default UserQuiz;
