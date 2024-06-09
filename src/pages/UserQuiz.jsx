import { useEffect, useRef, useState } from 'react';

import { useParams } from 'react-router-dom';

import { Settings } from '@mui/icons-material';
import { Alert, Box, Fade, IconButton, Stack } from '@mui/material';

import QuizSettingsContextProvider from '@/contexts/QuizSettings';

import BrandHeader from '@/components/misc/BrandHeader';
import PageContainer from '@/components/misc/PageContainer';
import GuessAnimeForm from '@/components/quiz/GuessAnimeForm';
import GuessHistory from '@/components/quiz/GuessHistory';
import NextAnimeCountdown from '@/components/quiz/NextAnimeCountdown';
import SeedControlPanel from '@/components/quiz/SeedControlPanel';
import SettingsDialog from '@/components/quiz/SettingsDialog';
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

  useEffect(
    function scrollSummaryCardIntoView() {
      if (quiz.isFinished) {
        summaryCard.current.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [quiz.isFinished]
  );

  return (
    <QuizSettingsContextProvider>
      <PageContainer isLoaderVisible={quiz.isInitialLoading}>
        <Box sx={{ width: { xs: 1, sm: 0.9, md: 0.7, lg: 0.5 } }}>
          <Stack spacing={2} sx={{ alignItems: 'center' }}>
            <Stack spacing={1} sx={{ alignItems: 'center' }}>
              <BrandHeader variant="h1" />
              <NextAnimeCountdown />
            </Stack>

            {!(quiz.isInitialLoading || quiz.isRequirementFulfilled) && (
              <Alert severity="error">User doesn't have enough completed anime to play the quiz</Alert>
            )}

            {quiz.isFinished && (
              <Box sx={{ width: 1 }}>
                <Fade mountOnEnter unmountOnExit in={quiz.isFinished}>
                  <SummaryCard ref={summaryCard} anime={quiz.featuredAnime} attempts={quiz.guesses.length} />
                </Fade>
              </Box>
            )}

            {quiz.isReady && (
              <Box sx={{ width: 1 }}>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <Box sx={{ flexGrow: 1 }} />
                  <UserChip user={quiz.user} />
                  <IconButton onClick={handleOpenSettingsDialog}>
                    <Settings />
                  </IconButton>
                </Stack>
              </Box>
            )}

            {quiz.isReady && !quiz.isFinished && (
              <Box sx={{ width: 1 }}>
                <GuessAnimeForm options={quiz.series} onSubmit={quiz.checkGuess} />
              </Box>
            )}

            {quiz.isReady && (
              <Box sx={{ width: 1 }}>
                <GuessHistory guesses={quiz.guesses} />
              </Box>
            )}

            {quiz.isReady && (
              <SeedControlPanel
                seed={quiz.seed}
                onChangeSeed={quiz.changeSeed}
                onRandomizeSeed={quiz.randomizeSeed}
                sx={{ color: 'text.secondary' }}
              />
            )}
          </Stack>
        </Box>

        <SettingsDialog isOpen={isSettingsDialogOpen} onClose={handleCloseSettingsDialog} />
      </PageContainer>
    </QuizSettingsContextProvider>
  );
};

export default UserQuiz;
