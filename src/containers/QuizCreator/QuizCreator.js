import React, { useState } from 'react'
import classes from './QuizCreator.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'
import { createControl, validate, validateForm } from '../../form/formFramework'
import axios from 'axios'

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
  const [isFormValid, setIsFormValid] = useState(false)
  const [rightAnswerId, setRightAnswerId] = useState(1)
  const [formControls, setFormControls] = useState(createFormControls())

  const submitHandler = event => {
    event.preventDefault()
  }

  const addQuestionHandler = event => {
    event.preventDefault()

    const updatedQuiz = [...quiz]
    const index = updatedQuiz.length + 1

    const { question, option1, option2, option3, option4 } = formControls

    const questionItem = {
      question: question.value,
      id: index,
      rightAnswerId: rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id }
      ]
    }

    updatedQuiz.push(questionItem)

    setQuiz(updatedQuiz)
    setIsFormValid(false)
    setRightAnswerId(1)
    setFormControls(createFormControls())
  }

  const createQuizHandler = async event => {
    event.preventDefault()

    try {
      await axios.post('https://react-quiz-a964c-default-rtdb.firebaseio.com/quiz.json', quiz)

      setQuiz([])
      setIsFormValid(false)
      setRightAnswerId(1)
      setFormControls(createFormControls())

    } catch (e) {
      console.log(e)
    }
  }  

  const changeHandler = (value, controlName) => {
    const updatedControls = { ...formControls }
    const control = { ...updatedControls[controlName] }

    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)

    updatedControls[controlName] = control

    setFormControls(updatedControls)
    setIsFormValid(validateForm(updatedControls))
  }

  const selectChangeHandler = event => {
    setRightAnswerId(+event.target.value)
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

  const select = (
    <Select
      label="Выберите правильный ответ"
      value={rightAnswerId}
      onChange={selectChangeHandler}
      options={[
        { text: 1, value: 1 },
        { text: 2, value: 2 },
        { text: 3, value: 3 },
        { text: 4, value: 4 }
      ]}
    />
  )

  return (
    <div className={classes.QuizCreator}>
      <div>
        <h1>Создание теста</h1>

        <form onSubmit={submitHandler}>
          {renderControls()}
          {select}

          <Button
            type="primary"
            onClick={addQuestionHandler}
            disabled={!isFormValid}
          >
            Добавить вопрос
          </Button>

          <Button
            type="success"
            onClick={createQuizHandler}
            disabled={quiz.length === 0}
          >
            Создать тест
          </Button>
        </form>
      </div>
    </div>
  )
}

export default QuizCreator