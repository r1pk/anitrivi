import { useState } from 'react';

import { useUsers } from '@/apis/anilist';

export const useUserSearch = (limit) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: users = [], isSuccess, isInitialLoading } = useUsers(searchTerm, limit);

  const searchUsers = (term) => {
    setSearchTerm(term);
  };

  return {
    isSuccess: isSuccess,
    isInitialLoading: isInitialLoading,
    users: users,
    searchUsers: searchUsers,
  };
};
