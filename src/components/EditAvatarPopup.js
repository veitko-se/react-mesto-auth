import {useEffect/*, useRef*/} from 'react';
import PopupWithForm from './PopupWithForm';
import useFormAndValidation from '../hooks/useFormAndValidation';

function EditAvatarPopup ({isOpen, onClose, onUpdateAvatar}) {
//const avatarRef = useRef();
  const {values, errors, isValid, handleChange, resetForm} = useFormAndValidation();

  useEffect(() => {
  //avatarRef.current.value='';
    resetForm({avatar: ''});
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
    //avatar: avatarRef.current.value,
      avatar: values.avatar,
    });
  }

  return (
    <PopupWithForm name="avatar" isOpen={isOpen} onClose={onClose} title="Обновить аватар" buttonText="Сохранить" onSubmit={handleSubmit} isValid={isValid}>
      <label className="form__field">
        <input
          aria-label="Ссылка на аватар"
          type="url"
          className={`form__input ${errors.avatar&&'form__input_type_error'}`}
          id="input-avatar-link"
          placeholder="Ссылка на аватар"
          required
          name="avatar"
        //ref={avatarRef}
          value={values.avatar||''}
          onChange={handleChange}
        />
        <span className={`form__error ${!isValid&&'form__error_visible'}`} id="input-avatar-link-error" name="avatar">{errors.avatar}</span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
