import React, { useState } from 'react'
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'

const Auth = () => {
  const [formControls, setFormControls] = useState({
    email: {
      value: '',
      type: 'email',
      label: 'Email',
      errorMessage: 'Введите корректный email',
      valid: false,
      touched: false,
      validation: {
        required: true,
        email: true
      }
    },
    password: {
      value: '',
      type: 'password',
      label: 'Пароль',
      errorMessage: 'Введите корректный пароль',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 6
      }
    }
  })

  const loginHandler = () => {
    console.log('Login')
  }

  const registerHandler = () => {
    console.log('Register')
  }

  const submitHandler = event => {
    event.preventDefault()
  }

  const onChangeHandler = (event, controlName) => {
    console.log(`${controlName}: `, event.target.value)
  }

  const renderInputs = () => {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName]
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={event => onChangeHandler(event, controlName)}
        />
      )
    })
  }

  return (
    <div className={classes.Auth}>
      <div>
        <h1>Авторизация</h1>

        <form onSubmit={submitHandler} className={classes.AuthForm}>
          {renderInputs()}

          <Button type="success" onClick={loginHandler}>
            Войти
          </Button>

          <Button type="primary" onClick={registerHandler}>
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Auth