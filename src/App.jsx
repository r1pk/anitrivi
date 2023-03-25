import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { dark } from '@/themes/dark';

import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '@/AppRoutes';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
      cacheTime: 1000 * 60 * 15,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={dark}>
        <CssBaseline />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
        <ToastContainer theme="dark" position={toast.POSITION.TOP_CENTER} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
