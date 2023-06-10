import { Box, Unstable_Grid2 as Grid } from '@mui/material';

import BrandHeader from '@/components/misc/BrandHeader';
import PageContainer from '@/components/misc/PageContainer';
import SearchUserForm from '@/components/users/SearchUserForm';
import SearchUserResults from '@/components/users/SearchUserResults';

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
              <SearchUserResults results={users} />
            </Grid>
          </Grid>
        )}
      </Grid>
    </PageContainer>
  );
};

export default Home;
