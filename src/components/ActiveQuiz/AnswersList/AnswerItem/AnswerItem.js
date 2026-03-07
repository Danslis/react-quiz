import React from 'react';
import classes from './AnswerItem.module.css';

const AnswerItem = ({ answer, onAnswerClick }) => {
  return (
    <li
      className={classes.AnswerItem}
      onClick={() => onAnswerClick(answer.id)}
    >
      {answer.text}
    </li>
  );
};

export default AnswerItem;