import { useState } from 'react';

import { Box, Stack } from '@mui/material';

import BrandHeader from '@/components/misc/BrandHeader';
import PageContainer from '@/components/misc/PageContainer';
import SearchUserForm from '@/components/users/SearchUserForm';
import SearchUserResults from '@/components/users/SearchUserResults';

import { useUsers } from '@/apis/anilist';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isSuccess, isInitialLoading } = useUsers({ searchTerm: searchTerm, limit: 6 });

  const handleSearchUser = (data) => {
    setSearchTerm(data.username);
  };

  return (
    <PageContainer isLoaderVisible={isInitialLoading}>
      <Box sx={{ width: { xs: 1, sm: 0.9, md: 0.7, lg: 0.5 } }}>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <BrandHeader variant="h1" />
          <Box sx={{ width: 1 }}>
            <SearchUserForm placeholder="AniList Username" onSubmit={handleSearchUser} />
          </Box>
          {isSuccess && (
            <Box sx={{ width: 1 }}>
              <SearchUserResults users={data?.users} />
            </Box>
          )}
        </Stack>
      </Box>
    </PageContainer>
  );
};

export default Home;
