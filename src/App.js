import React from 'react';
import Layout from './hoc/Layout/Layout';
import Quiz from './containers/Quiz/Quiz'
import {Routes, Route} from 'react-router-dom'
import QuizList from './containers/QuizList/QuizList'
import Auth from './containers/Auth/Auth'
import QuizCreator from './containers/QuizCreator/QuizCreator'

const App = () => (
  <Layout>
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/quiz-creator" element={<QuizCreator />} />
      <Route path="/quiz/:id" element={<Quiz />} />
      <Route path="/" element={<QuizList />} />
    </Routes>
  </Layout>
);

export default App;