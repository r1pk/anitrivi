import { useState } from 'react';

import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { Unstable_Grid2 as Grid, Stack, Box, LinearProgress, Fade } from '@mui/material';

import BrandHeader from '@/components/BrandHeader';

import { useUsers } from '@/apis/anilist';
import { SearchUserForm, SearchResults, UserSummary } from '@/features/users';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: users = [], isSuccess, isInitialLoading } = useUsers(searchTerm, 6);

  const handleSearchUser = (data) => {
    setSearchTerm(data.username);
  };

  return (
    <Stack spacing={2} sx={{ mt: { xs: 2, lg: 4 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <BrandHeader variant="h1" />
      </Box>
      <Grid container sx={{ justifyContent: 'center' }}>
        <Grid xs={12} sm={10} md={8} lg={6}>
          <Stack spacing={2}>
            <SearchUserForm placeholder="AniList Username" onSearchUser={handleSearchUser} />
            <Fade mountOnEnter unmountOnExit in={isInitialLoading}>
              <LinearProgress />
            </Fade>
            <Fade mountOnEnter unmountOnExit in={isSuccess}>
              <SearchResults>
                {users.map((user) => (
                  <Link component={RouterLink} to="." underline="none" key={user.id}>
                    <UserSummary user={user} />
                  </Link>
                ))}
              </SearchResults>
            </Fade>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Home;
