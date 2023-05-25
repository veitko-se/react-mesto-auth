import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup ({isOpen, onClose, onUpdateAvatar}) {

  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value='';
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm name="avatar" isOpen={isOpen} onClose={onClose} title="Обновить аватар" buttonText="Сохранить" onSubmit={handleSubmit}>
      <label className="form__field">
        <input
          aria-label="Ссылка на аватар"
          type="url"
          className="form__input"
          id="input-avatar-link"
          placeholder="Ссылка на аватар"
          required
          name="avatar"
          ref={avatarRef}
        />
        <span className="form__error" id="input-avatar-link-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
