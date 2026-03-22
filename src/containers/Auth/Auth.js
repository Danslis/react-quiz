import React, { useState, useCallback } from 'react';
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'
import axios from 'axios';

const Auth = () => {
  const [isFormValid, setIsFormValid] = useState(false)
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

  const loginHandler = useCallback(async () => {
    const authData = {
      email: formControls.email.value,
      password: formControls.password.value,
      returnSecureToken: true
    };
    try {
      const response = await axios.post(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=',
        authData
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  }, [formControls.email.value, formControls.password.value]);

  const registerHandler = useCallback(async () => {
    const authData = {
      email: formControls.email.value,
      password: formControls.password.value,
      returnSecureToken: true
    };
    try {
      const response = await axios.post(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=',
        authData
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  }, [formControls.email.value, formControls.password.value]);

  const submitHandler = event => {
    event.preventDefault()
  }

  const validateControl = (value, validation) => {
    if (!validation) {
      return true
    }

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = is.email(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  const onChangeHandler = (event, controlName) => {
    const updatedControls = { ...formControls }
    const control = { ...updatedControls[controlName] }

    control.value = event.target.value
    control.touched = true
    control.valid = validateControl(control.value, control.validation)

    updatedControls[controlName] = control

    let isFormValid = true
    Object.keys(updatedControls).forEach(name => {
      isFormValid = updatedControls[name].valid && isFormValid
    })

    setFormControls(updatedControls)
    setIsFormValid(isFormValid)
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

          <Button
            type="success"
            onClick={loginHandler}
            disabled={!isFormValid}
          >
            Войти
          </Button>

          <Button
            type="primary"
            onClick={registerHandler}
            disabled={!isFormValid}
          >
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Auth