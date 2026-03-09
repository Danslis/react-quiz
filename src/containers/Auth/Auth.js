import React, { useState } from 'react'
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginHandler = () => {
    console.log('Login')
  }

  const registerHandler = () => {
    console.log('Register')
  }

  const submitHandler = event => {
    event.preventDefault()
  }

  return (
    <div className={classes.Auth}>
      <div>
        <h1>Авторизация</h1>

        <form onSubmit={submitHandler} className={classes.AuthForm}>
          <Input
            label="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <Input
            label="Пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
            errorMessage="TEST"
          />

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