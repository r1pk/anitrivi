import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Link as RouterLink } from 'react-router-dom';

import { Link, Stack, Typography } from '@mui/material';

import PanelCard from '@/components/misc/PanelCard';

import UserChip from './UserChip';

const SearchUserResults = forwardRef(({ results, ...rest }, ref) => {
  return (
    <PanelCard title="Search Results" ref={ref} {...rest}>
      <Stack spacing={1}>
        {results.length === 0 && (
          <Typography variant="button" color="text.secondary" sx={{ alignSelf: 'center', py: 2 }}>
            No users found
          </Typography>
        )}
        {results.map((user) => (
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
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SearchUserResults;
