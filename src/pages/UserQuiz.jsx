import { useEffect, useRef, useState } from 'react';

import { useParams } from 'react-router-dom';

import { Alert, Box, Button, Fade, Unstable_Grid2 as Grid, Stack, Typography } from '@mui/material';

import BrandHeader from '@/components/misc/BrandHeader';
import LanguageSelect from '@/components/misc/LanguageSelect';
import PageContainer from '@/components/misc/PageContainer';
import PanelCard from '@/components/misc/PanelCard';
import GuessAnimeForm from '@/components/quiz/GuessAnimeForm';
import GuessEvaluationCard from '@/components/quiz/GuessEvaluationCard';
import NextAnimeCountdown from '@/components/quiz/NextAnimeCountdown';
import QuizSummaryCard from '@/components/quiz/QuizSummaryCard';
import UserChip from '@/components/users/UserChip';

import { useUserQuiz } from '@/hooks/useUserQuiz';
import { useUserStorage } from '@/hooks/useUserStorage';

const UserQuiz = () => {
  const { userId } = useParams();
  const summaryCard = useRef(null);

  const userQuiz = useUserQuiz({ userId: userId });
  const { userStorage, setUserStorage } = useUserStorage({
    userId: userId,
    initialStorage: { language: 'english', guesses: {} },
  });
  const [language, setLanguage] = useState(userStorage.language);

  const handleGuessAnime = (entry) => {
    if (userQuiz.isReady) {
      userQuiz.guessAnime(entry);
    }
  };

  const handleRestoreGuesses = () => {
    userQuiz.restoreGuesses(userStorage.guesses[userQuiz.seed]);
  };

  const handleChangeLanguage = (language) => {
    setLanguage(language);
  };

  useEffect(
    function scrollSummaryCardIntoView() {
      if (userQuiz.isFinished) {
        summaryCard.current.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [userQuiz.isFinished]
  );

  useEffect(
    function saveUserPreferences() {
      setUserStorage((prev) => ({ ...prev, language: language }));
    },
    [language, setUserStorage]
  );

  useEffect(
    function saveUserGuesses() {
      if (userQuiz.guesses.length > 0) {
        const animeIds = userQuiz.guesses.map((guess) => guess.anime.id);

        setUserStorage((prev) => ({
          ...prev,
          guesses: {
            [userQuiz.seed]: animeIds,
          },
        }));
      }
    },
    [userQuiz.guesses, userQuiz.seed, setUserStorage]
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
                <QuizSummaryCard
                  ref={summaryCard}
                  anime={userQuiz.anime.media}
                  attempts={userQuiz.guesses.length}
                  language={language}
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
                  <LanguageSelect
                    label="Title Language"
                    value={language}
                    languages={['english', 'romaji', 'native']}
                    onChangeLanguage={handleChangeLanguage}
                  />
                  <Box sx={{ flexGrow: 1 }} />
                  <UserChip user={userQuiz.user} />
                </Stack>
              </Grid>
            </Grid>

            {!userQuiz.isFinished && (
              <Grid container xs={12} sx={{ justifyContent: 'center' }}>
                <Grid xs={12} sm={10} md={8} lg={6}>
                  <GuessAnimeForm options={userQuiz.series} language={language} onSubmit={handleGuessAnime} />
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
                          isCorrect={guess.isCorrect}
                          anime={guess.anime}
                          evaluation={guess.evaluation}
                          language={language}
                        />
                      </Fade>
                    ))}
                  </Stack>
                </PanelCard>
              </Grid>
            </Grid>

            <Grid container xs={12} sx={{ justifyContent: 'center' }}>
              <Grid xs={12} sm={10} md={8} lg={6}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography variant="overline" color="text.secondary" sx={{ alignSelf: 'center' }}>
                    Seed: {userQuiz.seed}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </PageContainer>
  );
};

export default UserQuiz;
