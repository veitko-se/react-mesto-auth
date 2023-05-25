import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import auth from '../auth.js';
import useForm from '../hooks/useForm';

function Login({handleLogin}) {

  const {values, handleChange, setValues} = useForm({email: '', password: ''});

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.email || !values.password){
      return;
    }
    auth.authorize(values.email, values.password)
      .then((data) => {
        if (data.token){
          setValues({email: '', password: ''});
          handleLogin();
          navigate('/', {replace: true});
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <section className="sign">

          <h2 className="sign__title">Вход</h2>

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

            <button type="submit" className="sign__save-btn">Войти</button>
            {/* <div className="login__signup">
              <p>Ещё не зарегистрированы?</p>
              <Link to="/register" className="signup__link">Зарегистрироваться</Link>
            </div> */}
          </form>
    </section>
  )
}

export default Login;
