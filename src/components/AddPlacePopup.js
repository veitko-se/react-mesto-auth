import {useEffect} from 'react';
import PopupWithForm from './PopupWithForm';
import useFormAndValidation from '../hooks/useFormAndValidation';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const {values, errors, isValid, handleChange, resetForm} = useFormAndValidation();

  useEffect(() => {
    resetForm({name: '', link: ''});
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: values.name,
      link: values.link,
    });
  }

  return (
    <PopupWithForm name="place" isOpen={isOpen} onClose={onClose} title="Новое место" buttonText="Создать" onSubmit={handleSubmit} isValid={isValid}>
      <label className="form__field">
        <input
          aria-label="Название"
          type="text"
          className={`form__input ${errors.name&&'form__input_type_error'}`}
          id="input-place-name"
          placeholder="Название"
          required
          name="name"
          minLength="2"
          maxLength="30"
          value={values.name||''}
          onChange={handleChange}
        />
        <span className={`form__error ${!isValid&&'form__error_visible'}`} id="input-place-name-error" name="name">{errors.name}</span>
      </label>
      <label className="form__field">
        <input
          aria-label="Ссылка на картинку"
          type="url"
          className={`form__input ${errors.link&&'form__input_type_error'}`}
          id="input-place-link"
          placeholder="Ссылка на картинку"
          required
          name="link"
          value={values.link||''}
          onChange={handleChange}
        />
        <span className={`form__error ${!isValid&&'form__error_visible'}`} id="input-place-link-error" name="link">{errors.link}</span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
