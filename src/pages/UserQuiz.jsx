import { useState, useRef, useEffect } from 'react';

import { Unstable_Grid2 as Grid, Stack, Box, Alert, Typography, Fade } from '@mui/material';
import { useParams } from 'react-router-dom';

import PageContainer from '@/components/misc/PageContainer';
import BrandHeader from '@/components/misc/BrandHeader';
import LanguageSelect from '@/components/misc/LanguageSelect';
import PanelCard from '@/components/misc/PanelCard';

import GuessAnimeForm from '@/components/quiz/GuessAnimeForm';
import GuessEvaluationCard from '@/components/quiz/GuessEvaluationCard';
import QuizSummaryCard from '@/components/quiz/QuizSummaryCard';
import NextAnimeCountdown from '@/components/quiz/NextAnimeCountdown';

import UserChip from '@/components/users/UserChip';

import { useUserQuiz } from '@/hooks/useUserQuiz';

const UserQuiz = () => {
  const { userId } = useParams();
  const summaryCard = useRef(null);

  const userQuiz = useUserQuiz(userId);
  const [language, setLanguage] = useState('english');

  const handleGuessAnime = (entry) => {
    if (userQuiz.isReady) {
      userQuiz.guessAnime(entry);
    }
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

  return (
    <PageContainer isLoaderVisible={userQuiz.isInitialLoading}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 2 }}>
        <BrandHeader variant="h1" />
        <NextAnimeCountdown />
      </Box>

      <Grid container sx={{ justifyContent: 'center' }}>
        <Grid xs={12} sm={10} md={8} lg={6}>
          <Fade mountOnEnter unmountOnExit in={userQuiz.isFinished}>
            <Box sx={{ my: 4 }}>
              {userQuiz.isFinished && (
                <QuizSummaryCard
                  ref={summaryCard}
                  anime={userQuiz.anime.media}
                  attempts={userQuiz.guesses.length}
                  language={language}
                />
              )}
            </Box>
          </Fade>
        </Grid>
      </Grid>

      {!(userQuiz.isInitialLoading || userQuiz.isRequirementFulfilled) && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 2 }}>
          <Alert severity="error">User doesn't have enough completed anime to play the quiz</Alert>
        </Box>
      )}

      <Grid container sx={{ justifyContent: 'center' }}>
        <Grid xs={12} sm={10} md={8} lg={6}>
          {userQuiz.isReady && (
            <Stack spacing={2}>
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
              {!userQuiz.isFinished && (
                <GuessAnimeForm options={userQuiz.series} onGuessAnime={handleGuessAnime} language={language} />
              )}
              <PanelCard title="Guess History">
                <Stack spacing={1}>
                  {userQuiz.guesses.length === 0 && (
                    <Typography variant="button" color="text.secondary" sx={{ alignSelf: 'center', py: 2 }}>
                      No guesses yet
                    </Typography>
                  )}
                  {userQuiz.guesses.map((guess, index) => (
                    <Fade key={index} in={true}>
                      <GuessEvaluationCard
                        elevation={2}
                        anime={guess.anime}
                        evaluation={guess.evaluation}
                        language={language}
                      />
                    </Fade>
                  ))}
                </Stack>
              </PanelCard>
              <Typography variant="overline" color="text.secondary" sx={{ alignSelf: 'center' }}>
                Seed: {userQuiz.seed}
              </Typography>
            </Stack>
          )}
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default UserQuiz;
