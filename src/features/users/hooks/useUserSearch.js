import { useState } from 'react';

import { useUsers } from '@/apis/anilist';

export const useUserSearch = (limit) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isFetching, isFetched } = useUsers(searchTerm, limit);

  const searchUsers = (term) => {
    setSearchTerm(term);
  };

  return {
    users: data?.users,
    isFetched: isFetched,
    isFetching: isFetching,
    searchUsers: searchUsers,
  };
};
