import React, { useEffect, useState } from 'react'
import classes from './QuizList.module.css'
import {NavLink} from 'react-router-dom'
import axios from 'axios'

const QuizList = () => {
  const [quizes, setQuizes] = useState([])
  const [setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://react-quiz-a964c-default-rtdb.firebaseio.com/quiz.json')

        const quizesArray = []

        if (response.data) {
          Object.keys(response.data).forEach((key, index) => {
            quizesArray.push({
              id: key,
              name: `Тест №${index + 1}`
            })
          })
        }

        setQuizes(quizesArray)       
      } catch (e) {
        console.log(e)
        setError('Ошибка загрузки тестов')
      }
    }

    fetchData()
  }, [setError])   

  const renderQuizes = () => {
    return quizes.map(quiz => {
      return (
        <li
          key={quiz.id}
        >
          <NavLink to={'/quiz/' + quiz.id}>
            {quiz.name}
          </NavLink>
        </li>
      )
    })
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