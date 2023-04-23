import { useState } from 'react';

import { useUsers } from '@/apis/anilist';

export const useUserSearch = ({ limit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isSuccess, isInitialLoading } = useUsers({ searchTerm: searchTerm, limit: limit });

  const searchUsers = (term) => {
    setSearchTerm(term);
  };

  return {
    users: data?.users,
    isSuccess: isSuccess,
    isInitialLoading: isInitialLoading,
    searchUsers: searchUsers,
  };
};
