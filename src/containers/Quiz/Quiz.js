import React, { useState } from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

const Quiz = () => {
  const [quiz] = useState([
    {
      answers: [
        { text: 'Вопрос 1' },
        { text: 'Вопрос 2' },
        { text: 'Вопрос 3' },
        { text: 'Вопрос 4' }
      ]
    }
  ]);

  return (
    <div className={classes.Quiz}>
      <div className={classes.QuizWrapper}>
        <h1>Ответьте на все вопросы</h1>

        <ActiveQuiz
          answers={quiz[0].answers}
        />
      </div>
    </div>
  );
};

export default Quiz;