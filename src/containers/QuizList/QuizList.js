import React from 'react'
import classes from './QuizList.module.css'
import {NavLink} from 'react-router-dom'

const QuizList = () => {
  const renderQuizes = () => {
    return [1, 2, 3].map((quiz, index) => (
      <li key={index}>
        <NavLink 
          to={`/quiz/${quiz}`}
          className={({ isActive }) => isActive ? classes.active : null}
        >
          Тест {quiz}
        </NavLink>
      </li>
    ))
  }

  return (
    <div className={classes.QuizList}>
      <div>
        <h1>Список тестов</h1>
        <ul>
          {renderQuizes()}
        </ul>
      </div>
    </div>
  )
}

export default QuizList