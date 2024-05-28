import { Outlet } from 'react-router-dom';

import { Container, GlobalStyles } from '@mui/material';

const MainLayout = () => {
  return (
    <Container maxWidth="xl">
      <Outlet />
      <GlobalStyles
        styles={(theme) => ({
          body: {
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundImage: 'url(/assets/background_9-16.svg), url(/assets/background.png)',

            [theme.breakpoints.up('md')]: {
              backgroundImage: 'url(/assets/background_16-9.svg), url(/assets/background.png)',
            },
          },
        })}
      />
    </Container>
  );
};

export default MainLayout;
