import Popup from './Popup';

function PopupWithForm({isOpen, onClose, onSubmit, name, title, buttonText, children}) {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <h2 className={`popup__title popup__title_type_${name}`}>{title}</h2>
      <form className="form" name={name} id={`form-${name}`} onSubmit={onSubmit}>
        {children}
        <button type="submit" className="form__save-btn">{buttonText}</button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
