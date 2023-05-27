import Popup from './Popup';

function PopupWithForm({isOpen, onClose, onSubmit, name, title, buttonText, isValid, children}) {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <h2 className={`popup__title popup__title_type_${name}`}>{title}</h2>
      <form className="form" name={name} id={`form-${name}`} onSubmit={onSubmit} noValidate>
        {children}
        <button type="submit" className={`form__save-btn ${!isValid&&'form__save-btn_disabled'}`} disabled={!isValid ?'+true':''}>{buttonText}</button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
