import React from 'react';
import classes from './ActiveQuiz.module.css';
import AnswersList from './AnswersList/AnswersList';

const ActiveQuiz = ({ 
  question, 
  answers, 
  onAnswerClick,
  questionNumber,
  totalQuestions
}) => {
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <span>
          <strong>{questionNumber}.</strong>&nbsp;
          {question}
        </span>
        <small>{questionNumber} из {totalQuestions}</small>
      </p>

      <AnswersList
        answers={answers}
        onAnswerClick={onAnswerClick}
      />
    </div>
  );
};

export default ActiveQuiz;