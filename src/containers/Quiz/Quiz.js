import { useState } from 'react';
import classes from './Quiz.module.css';

const Quiz = () => {
  const [quiz, setQuiz] = useState([]);

  return (
    <div className={classes.Quiz}>
      <h1>Quiz</h1>
    </div>
  );
};

export default Quiz;