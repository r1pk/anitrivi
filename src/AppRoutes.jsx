import { Routes, Route } from 'react-router-dom';

import Home from '@/pages/Home';
import UserQuiz from '@/pages/UserQuiz';

import MainLayout from './layouts/main/MainLayout';

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
