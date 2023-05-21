import React from 'react';
import PopupWithForm from './PopupWithForm';
import useForm from '../hooks/useForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const {values, handleChange, setValues} = useForm({name: '', link: ''});

  React.useEffect(() => {
    setValues({name: '', link: ''})
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: values.name,
      link: values.link,
    });
  }

  return (
    <PopupWithForm name="place" isOpen={isOpen} onClose={onClose} title="Новое место" buttonText="Создать" onSubmit={handleSubmit}>
      <label className="popup__field">
        <input
          aria-label="Название"
          type="text"
          className="popup__input"
          id="input-place-name"
          placeholder="Название"
          required
          name="name"
          minLength="2"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
        />
        <span className="popup__error" id="input-place-name-error"></span>
      </label>
      <label className="popup__field">
        <input
          aria-label="Ссылка на картинку"
          type="url"
          className="popup__input"
          id="input-place-link"
          placeholder="Ссылка на картинку"
          required
          name="link"
          value={values.link}
          onChange={handleChange}
        />
        <span className="popup__error" id="input-place-link-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
