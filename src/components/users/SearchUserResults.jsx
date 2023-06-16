import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Link as RouterLink } from 'react-router-dom';

import { Link, Stack, Typography } from '@mui/material';

import PanelCard from '@/components/misc/PanelCard';

import UserChip from './UserChip';

const SearchUserResults = forwardRef(({ users, ...rest }, ref) => {
  return (
    <PanelCard title="Search Results" ref={ref} {...rest}>
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
  );
});

SearchUserResults.displayName = 'SearchUserResults';
SearchUserResults.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default SearchUserResults;
