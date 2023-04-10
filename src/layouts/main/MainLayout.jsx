import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

import FixedBackground from './FixedBackground';

const MainLayout = () => {
  return (
    <Container maxWidth="xl">
      <FixedBackground />
      <Outlet />
    </Container>
  );
};

export default MainLayout;
