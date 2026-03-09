import React, { useState } from 'react'
import classes from './QuizCreator.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import { createControl } from '../../form/formFramework'

const createOptionControl = (number) => {
  return createControl({
    label: `Вариант ${number}`,
    errorMessage: 'Значение не может быть пустым',
    id: number
  }, { required: true })
}

const createFormControls = () => {
  return {
    question: createControl({
      label: 'Введите вопрос',
      errorMessage: 'Вопрос не может быть пустым'
    }, { required: true }),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4)
  }
}

const QuizCreator = () => {
  const [quiz, setQuiz] = useState([])
  const [formControls, setFormControls] = useState(createFormControls())

  const submitHandler = event => {
    event.preventDefault()
  }

  const addQuestionHandler = () => {
    console.log('Add question')
  }

  const createQuizHandler = () => {
    console.log('Create quiz')
  }

  const changeHandler = (value, controlName) => {
    console.log(value, controlName)
  }

  const renderControls = () => {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName]

      return (
        <React.Fragment key={controlName + index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={event => changeHandler(event.target.value, controlName)}
          />
          {index === 0 && <hr />}
        </React.Fragment>
      )
    })
  }

  return (
    <div className={classes.QuizCreator}>
      <div>
        <h1>Создание теста</h1>

        <form onSubmit={submitHandler}>
          {renderControls()}

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