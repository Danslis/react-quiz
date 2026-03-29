import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import Quiz from './containers/Quiz/Quiz';
import QuizList from './containers/QuizList/QuizList';
import Auth from './containers/Auth/Auth';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import Logout from './components/Logout/Logout';
import { autoLogin } from './store/actions/auth';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => !!state.auth?.token);
 
  useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        {!isAuthenticated ? (
          // Маршруты для неавторизованных пользователей
          <>
            <Route path="/auth" element={<Auth />} />
            <Route path="/quiz/:id" element={<Quiz />} />
            <Route path="/" element={<QuizList />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          // Маршруты для авторизованных пользователей
          <>
            <Route path="/quiz-creator" element={<QuizCreator />} />
            <Route path="/quiz/:id" element={<Quiz />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<QuizList />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </Layout>
  );
};

export default App;