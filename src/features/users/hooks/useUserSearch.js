import { useState } from 'react';

import { toast } from 'react-toastify';

import { anilist } from '@/api/anilist';

export const useUserSearch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchUsers = async (query) => {
    try {
      setIsLoading(true);
      const results = await anilist.getUserList(query, 6);

      setUsers(results);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { users, isLoading, searchUsers };
};
