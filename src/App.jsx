import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/configs/query-client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { dark } from '@/themes/dark';

import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '@/AppRoutes';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
