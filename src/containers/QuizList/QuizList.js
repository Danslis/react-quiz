import React, { useEffect } from 'react'
import classes from './QuizList.module.css'
import {NavLink} from 'react-router-dom'
import axios from 'axios'

const QuizList = () => {
  useEffect(() => {
    axios.get('https://react-quiz-a964c-default-rtdb.firebaseio.com/quiz.json')
      .then(response => {
        console.log(response)
      })
  }, [])

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