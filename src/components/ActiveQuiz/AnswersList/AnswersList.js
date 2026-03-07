import React from 'react';
import classes from './AnswersList.module.css';
import AnswerItem from './AnswerItem/AnswerItem';

const AnswersList = ({ answers, onAnswerClick }) => {
  return (
    <ul className={classes.AnswersList}>
      {answers.map((answer, index) => (
        <AnswerItem
          key={index}
          answer={answer}
          onAnswerClick={onAnswerClick}
        />
      ))}
    </ul>
  );
};

export default AnswersList;