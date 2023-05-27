import {useNavigate} from 'react-router-dom';
import auth from '../auth.js';
import useForm from '../hooks/useForm';

function Login({handleLogin}) {

  const {values, handleChange, setValues} = useForm({email: '', password: ''});
  const navigate = useNavigate();

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!values.email || !values.password){
      return;
    }
    auth.authorize(values.email, values.password)
    .then((data) => {
      if (data.token){
        handleLogin(values.email);
        setValues({email: '', password: ''});
        navigate('/', {replace: true});
      }
    })
    .catch(err => console.log(`Ошибка: ${err}`));
  };

  return (
    <section className="login">
      <h2 className="login__title">Вход</h2>
      <form className="form form_type_login" onSubmit={handleSubmit} >
          <label className="form__field">
            <input
              aria-label="Email"
              type="text"
              className="form__input form__input_type_login"
              id="input-signin-email"
              placeholder="Email"
              required
              name="email"
              minLength="2"
              maxLength="40"
              value={values.email}
              onChange={handleChange}
            />
            <span className="form__error" id="input-signin-email-error"></span>
          </label>
          <label className="form__field">
            <input
              aria-label="Пароль"
              type="password"
              className="form__input form__input_type_login"
              id="input-signin-password"
              placeholder="Пароль"
              required
              name="password"
              minLength="2"
              maxLength="40"
              value={values.password}
              onChange={handleChange}
            />
            <span className="form__error" id="input-signin-password-error"></span>
          </label>
        <button type="submit" className="form__save-btn form_save-btn_type_login">Войти</button>
      </form>
    </section>
  )
}

export default Login;
