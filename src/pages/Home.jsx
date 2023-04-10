import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { Unstable_Grid2 as Grid, Stack, Box, Typography } from '@mui/material';

import PageContainer from '@/components/PageContainer';
import BrandHeader from '@/components/BrandHeader';
import PanelCard from '@/components/PanelCard';

import { SearchUserForm, UserChip, useUserSearch } from '@/features/users';

const Home = () => {
  const { users, isFetched, isFetching, searchUsers } = useUserSearch(6);

  const handleSearchUser = (data) => {
    searchUsers(data.username);
  };

  return (
    <PageContainer isLoaderVisible={isFetching}>
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
        <BrandHeader variant="h1" />
      </Box>
      <Grid container sx={{ justifyContent: 'center' }}>
        <Grid xs={12} sm={10} md={8} lg={6}>
          <Stack spacing={2}>
            <SearchUserForm placeholder="AniList Username" onSearchUser={handleSearchUser} />
            {isFetched && (
              <PanelCard title="Search Results">
                <Stack spacing={1}>
                  {users.length === 0 && (
                    <Typography variant="button" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                      No users found
                    </Typography>
                  )}
                  {users.map((user) => (
                    <Link component={RouterLink} to={`/user-quiz/${user.id}`} underline="none" key={user.id}>
                      <UserChip user={user} />
                    </Link>
                  ))}
                </Stack>
              </PanelCard>
            )}
          </Stack>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Home;
