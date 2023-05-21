import { Link as RouterLink } from 'react-router-dom';

import { Box, Unstable_Grid2 as Grid, Link, Stack, Typography } from '@mui/material';

import BrandHeader from '@/components/misc/BrandHeader';
import PageContainer from '@/components/misc/PageContainer';
import PanelCard from '@/components/misc/PanelCard';
import SearchUserForm from '@/components/users/SearchUserForm';
import UserChip from '@/components/users/UserChip';

import { useUserSearch } from '@/hooks/useUserSearch';

const Home = () => {
  const { users, isSuccess, isInitialLoading, searchUsers } = useUserSearch({ limit: 6 });

  const handleSearchUser = (data) => {
    searchUsers(data.username);
  };

  return (
    <PageContainer isLoaderVisible={isInitialLoading}>
      <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
        <Grid xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <BrandHeader variant="h1" />
          </Box>
        </Grid>

        <Grid container xs={12} sx={{ justifyContent: 'center' }}>
          <Grid xs={12} sm={10} md={8} lg={6}>
            <SearchUserForm placeholder="AniList Username" onSubmit={handleSearchUser} />
          </Grid>
        </Grid>

        {isSuccess && (
          <Grid container xs={12} sx={{ justifyContent: 'center' }}>
            <Grid xs={12} sm={10} md={8} lg={6}>
              <PanelCard title="Search Results">
                <Stack spacing={1}>
                  {users.length === 0 && (
                    <Typography variant="button" color="text.secondary" sx={{ alignSelf: 'center', py: 2 }}>
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
            </Grid>
          </Grid>
        )}
      </Grid>
    </PageContainer>
  );
};

export default Home;
