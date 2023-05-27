import AuthForm from './AuthForm';

function Login({onLogin}) {

  return (
    <section className="login">
      <h2 className="login__title">Вход</h2>
      <AuthForm buttonText='Войти' onAuth={onLogin} />
    </section>
  )
}

export default Login;
