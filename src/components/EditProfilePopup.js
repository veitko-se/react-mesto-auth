import {useContext, useEffect} from 'react';
import PopupWithForm from './PopupWithForm';
import useFormAndValidation from '../hooks/useFormAndValidation';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = useContext(CurrentUserContext);
  const {values, errors, isValid, handleChange, resetForm} = useFormAndValidation();

  useEffect(() => {
    resetForm({name: currentUser.name, description: currentUser.about});
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.description,
    });
  }

  return (
    <PopupWithForm name="profile" isOpen={isOpen} onClose={onClose} title="Редактировать профиль" buttonText="Сохранить" onSubmit={handleSubmit} isValid={isValid}>
      <label className="form__field">
        <input
          aria-label="Имя"
          type="text"
          className={`form__input ${errors.name&&'form__input_type_error'}`}
          id="input-profile-name"
          placeholder="Имя"
          required
          name="name"
          minLength="2"
          maxLength="40"
          value={values.name||''}
          onChange={handleChange}
        />
        <span className={`form__error ${!isValid&&'form__error_visible'}`} id="input-profile-name-error" name="name">{errors.name}</span>
      </label>
      <label className="form__field">
        <input
          aria-label="О себе"
          type="text"
          className={`form__input ${errors.description&&'form__input_type_error'}`}
          id="input-profile-job"
          placeholder="О себе"
          required
          name="description"
          minLength="2"
          maxLength="200"
          value={values.description||''}
          onChange={handleChange}
        />
        <span className={`form__error ${!isValid&&'form__error_visible'}`} id="input-profile-job-error" name="description">{errors.description}</span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
