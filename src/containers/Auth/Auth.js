import React, { useState, useCallback } from 'react';
import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import is from 'is_js';
import { useDispatch } from 'react-redux';
import { auth } from '../../store/actions/auth';

const Auth = () => {
  const dispatch = useDispatch();
  
  const [isFormValid, setIsFormValid] = useState(false);
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
  });

  const validateControl = useCallback((value, validation) => {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validation.email) {
      isValid = is.email(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  }, []);

  const onChangeHandler = useCallback((event, controlName) => {
    const updatedControls = { ...formControls };
    const control = { ...updatedControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);

    updatedControls[controlName] = control;

    let formIsValid = true;
    Object.keys(updatedControls).forEach(name => {
      formIsValid = updatedControls[name].valid && formIsValid;
    });

    setFormControls(updatedControls);
    setIsFormValid(formIsValid);
  }, [formControls, validateControl]);

  const loginHandler = useCallback(() => {
    dispatch(auth(
      formControls.email.value,
      formControls.password.value,
      true
    ));
  }, [dispatch, formControls.email.value, formControls.password.value]);

  const registerHandler = useCallback(() => {
    dispatch(auth(
      formControls.email.value,
      formControls.password.value,
      false
    ));
  }, [dispatch, formControls.email.value, formControls.password.value]);

  const submitHandler = useCallback((event) => {
    event.preventDefault();
  }, []);

  const renderInputs = useCallback(() => {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];
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
      );
    });
  }, [formControls, onChangeHandler]);

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
  );
};

export default Auth;