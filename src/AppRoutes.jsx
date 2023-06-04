import { Route, Routes } from 'react-router-dom';

import MainLayout from '@/layouts/main/MainLayout';

import Home from '@/pages/Home';
import UserQuiz from '@/pages/UserQuiz';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/user-quiz">
          <Route path=":userId" element={<UserQuiz />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
