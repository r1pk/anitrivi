import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { Unstable_Grid2 as Grid, Stack, Box, LinearProgress, Fade } from '@mui/material';

import BrandHeader from '@/components/BrandHeader';
import PanelCard from '@/components/PanelCard';

import { SearchUserForm, UserChip, useUserSearch } from '@/features/users';

const Home = () => {
  const { users, isFetched, isFetching, searchUsers } = useUserSearch(6);

  const handleSearchUser = (data) => {
    searchUsers(data.username);
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
            <Fade mountOnEnter unmountOnExit in={isFetching}>
              <LinearProgress />
            </Fade>
            <Fade mountOnEnter unmountOnExit in={isFetched}>
              <PanelCard title="Search Results">
                <Stack spacing={1}>
                  {isFetched &&
                    users.map((user) => (
                      <Link component={RouterLink} to="." underline="none" key={user.id}>
                        <UserChip user={user} />
                      </Link>
                    ))}
                </Stack>
              </PanelCard>
            </Fade>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Home;
