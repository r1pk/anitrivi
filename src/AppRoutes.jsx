import { Routes, Route } from 'react-router-dom';

import { MainLayout } from './layouts/main';

import Home from '@/pages/Home';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
