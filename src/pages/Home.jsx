import { Unstable_Grid2 as Grid } from '@mui/material';
import { Stack, Box, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import PageContainer from '@/components/misc/PageContainer';
import BrandHeader from '@/components/misc/BrandHeader';
import PanelCard from '@/components/misc/PanelCard';

import SearchUserForm from '@/components/users/SearchUserForm';
import UserChip from '@/components/users/UserChip';

import { useUserSearch } from '@/hooks/useUserSearch';

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
                    <Typography variant="button" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
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
