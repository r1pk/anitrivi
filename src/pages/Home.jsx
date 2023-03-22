import { useState } from 'react';

import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { Unstable_Grid2 as Grid, Stack, Box, LinearProgress, Fade } from '@mui/material';

import { toast } from 'react-toastify';

import BrandHeader from '@/components/BrandHeader';

import { anilist } from '@/api/anilist';
import { SearchUserForm, SearchResults, UserSummary } from '@/features/users';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchUser = async (data) => {
    try {
      setIsLoading(true);
      const results = await anilist.getUserList(data.username, 6);

      setUsers(results);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
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
            <Fade mountOnEnter unmountOnExit in={isLoading}>
              <LinearProgress />
            </Fade>
            <Fade mountOnEnter unmountOnExit in={users.length > 0}>
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
