import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import auth from '../auth.js';
import useForm from '../hooks/useForm';
import InfoTooltip from './InfoTooltip';

function Register() {

  const {values, handleChange} = useForm({email: '', password: ''});
  const navigate = useNavigate();
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegisterError, setIsRegisterError] = useState(false);

  function handleSubmit(evt) {
    evt.preventDefault();
    auth.register(values.email, values.password)
    .then(() => {
      setIsInfoTooltipOpen(true);
      setIsRegisterError(false);
    })
    .catch(err => {
      setIsInfoTooltipOpen(true);
      setIsRegisterError(true);
      console.log(`Ошибка: ${err}`);
    });
  }

  function onClosePopup() {
    if (!isRegisterError) {
      navigate('/sign-in', {replace: true})
    }
    setIsInfoTooltipOpen(false);
  };

  return (
    <>
      <section className="login">
        <h2 className="login__title">Регистрация</h2>
        <form className="form form_type_login" onSubmit={handleSubmit} >
            <label className="form__field">
              <input
                aria-label="Email"
                type="text"
                className="form__input form__input_type_login"
                id="input-signup-email"
                placeholder="Email"
                required
                name="email"
                minLength="2"
                maxLength="40"
                value={values.email}
                onChange={handleChange}
              />
              <span className="form__error" id="input-signup-email-error"></span>
            </label>
            <label className="form__field">
              <input
                aria-label="Пароль"
                type="password"
                className="form__input form__input_type_login"
                id="input-signup-password"
                placeholder="Пароль"
                required
                name="password"
                minLength="2"
                maxLength="40"
                value={values.password}
                onChange={handleChange}
              />
              <span className="form__error" id="input-signup-password-error"></span>
            </label>
          <button type="submit" className="form__save-btn form_save-btn_type_login">Зарегистрироваться</button>
          <p className="login__link-block">Уже зарегистрированы?&nbsp;
            <Link to="/sign-in" className="login__link">Войти</Link>
          </p>
        </form>
      </section>
      <InfoTooltip name="info" isOpen={isInfoTooltipOpen} onClose={onClosePopup} isError={isRegisterError} />
    </>
  )
}

export default Register;
