import React from 'react';
import PopupWithForm from './PopupWithForm';
import useForm from '../hooks/useForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

  const currentUser = React.useContext(CurrentUserContext);
  const {values, handleChange, setValues} = useForm({name: currentUser.name, description: currentUser.about});

  React.useEffect(() => {
    setValues({name: currentUser.name, description: currentUser.about})
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.description,
    });
  }

  return (
    <PopupWithForm name="profile" isOpen={isOpen} onClose={onClose} title="Редактировать профиль" buttonText="Сохранить" onSubmit={handleSubmit}>
      <label className="popup__field">
        <input
          aria-label="Имя"
          type="text"
          className="popup__input"
          id="input-profile-name"
          placeholder="Имя"
          required
          name="name"
          minLength="2"
          maxLength="40"
          value={values.name}
          onChange={handleChange}
        />
        <span className="popup__error" id="input-profile-name-error"></span>
      </label>
      <label className="popup__field">
        <input
          aria-label="О себе"
          type="text"
          className="popup__input"
          id="input-profile-job"
          placeholder="О себе"
          required
          name="description"
          minLength="2"
          maxLength="200"
          value={values.description}
          onChange={handleChange}
        />
        <span className="popup__error" id="input-profile-job-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
