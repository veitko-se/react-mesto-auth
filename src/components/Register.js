import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import auth from '../auth.js';
import useForm from '../hooks/useForm';

function Register({handleLogin}) {

  const {values, handleChange, setValues} = useForm({email: '', password: ''});

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
      auth.register(values.email, values.password)
      .then(() => {
        navigate('/sign-in', {replace: true});
      })
      .catch(err => console.log(err));
  }


  return (
    <section className="sign">

          <h2 className="sign__title">Регистрация</h2>

          <form className="sign__form" onSubmit={handleSubmit} >

              <label className="sign__field">
                <input
                  aria-label="Email"
                  type="text"
                  className="sign__input"
                  id="input-signin-email"
                  placeholder="Email"
                  required
                  name="email"
                  minLength="2"
                  maxLength="40"
                  value={values.email}
                  onChange={handleChange}
                />
                <span className="sign__error" id="input-signin-email-error"></span>
              </label>
              <label className="sign__field">
                <input
                  aria-label="Пароль"
                  type="password"
                  className="sign__input"
                  id="input-signin-password"
                  placeholder="Пароль"
                  required
                  name="password"
                  minLength="2"
                  maxLength="40"
                  value={values.password}
                  onChange={handleChange}
                />
                <span className="sign__error" id="input-signin-password-error"></span>
              </label>

            <button type="submit" className="sign__save-btn">Зарегистрироваться</button>

              <p className="sign__to-signin">Уже зарегистрированы?&nbsp;
                <Link to="/sign-in" className="sign__link">Войти</Link>
              </p>

          </form>
    </section>
  )
}

export default Register;
