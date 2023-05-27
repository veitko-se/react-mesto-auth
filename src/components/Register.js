import AuthForm from './AuthForm';
import {Link} from 'react-router-dom';

function Register({onRegister}) {

  return (
    <section className="login">
      <h2 className="login__title">Регистрация</h2>
      <AuthForm buttonText='Зарегистрироваться' onAuth={onRegister}>
        <p className="login__link-block">Уже зарегистрированы?&nbsp;
          <Link to="/sign-in" className="login__link">Войти</Link>
        </p>
      </AuthForm>
    </section>
  )
}

export default Register;
