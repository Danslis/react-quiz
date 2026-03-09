import React from 'react'
import classes from './QuizCreator.module.css'
import Button from '../../components/UI/Button/Button'

const QuizCreator = () => {
  const submitHandler = event => {
    event.preventDefault()
  }

  const addQuestionHandler = () => {
    console.log('Add question')
  }

  const createQuizHandler = () => {
    console.log('Create quiz')
  }

  return (
    <div className={classes.QuizCreator}>
      <div>
        <h1>Создание теста</h1>

        <form onSubmit={submitHandler}>
          <input type="text" placeholder="Вопрос" />
          <hr />
          <input type="text" placeholder="Вариант 1" />
          <input type="text" placeholder="Вариант 2" />
          <input type="text" placeholder="Вариант 3" />
          <input type="text" placeholder="Вариант 4" />

          <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>

          <Button type="primary" onClick={addQuestionHandler}>
            Добавить вопрос
          </Button>

          <Button type="success" onClick={createQuizHandler}>
            Создать тест
          </Button>
        </form>
      </div>
    </div>
  )
}

export default QuizCreator