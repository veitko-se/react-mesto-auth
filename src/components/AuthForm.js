import {useEffect} from 'react';
import useFormAndValidation from '../hooks/useFormAndValidation';

function AuthForm({onAuth, buttonText, children}) {
  const {values, errors, isValid, handleChange, resetForm} = useFormAndValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onAuth(values.email, values.password);
  };

  useEffect(() => {
    resetForm({email: '', password: ''});
  }, []);

  return (
      <form className="form form_type_login" onSubmit={handleSubmit} noValidate>
        <label className="form__field">
          <input
            aria-label="Email"
            type="email"
            className={`form__input form__input_type_login ${errors.email&&'form__input_type_error'}`}
            id="input-auth-email"
            placeholder="Email"
            required
            name="email"
            minLength="2"
            maxLength="40"
            value={values.email||''}
            onChange={handleChange}
          />
          <span className={`form__error ${!isValid&&'form__error_visible'}`} id="input-auth-email-error" name="email">{errors.email}</span>
        </label>
        <label className="form__field">
          <input
            aria-label="Пароль"
            type="password"
            className={`form__input form__input_type_login ${errors.password&&'form__input_type_error'}`}
            id="input-auth-password"
            placeholder="Пароль"
            required
            name="password"
            minLength="2"
            maxLength="40"
            value={values.password||''}
            onChange={handleChange}
          />
          <span className={`form__error ${!isValid&&'form__error_visible'}`} id="input-auth-password-error" name="password">{errors.password}</span>
        </label>
        <button type="submit" className={`form__save-btn form_save-btn_type_login ${!isValid&&'form__save-btn_disabled'}`} disabled={!isValid ?'+true':''}>
            {buttonText}
        </button>
        {children}
      </form>
  )
}

export default AuthForm;
