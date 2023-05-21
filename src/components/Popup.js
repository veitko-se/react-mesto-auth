import React from 'react';

const Popup = ({isOpen, name, onClose, children}) => {

  React.useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        onClose();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  function handleOverlay(evt) {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-btn')) {
      onClose();
    }
  }

  return (
    <section className={`popup ${isOpen&&'popup_opened'} popup_type_${name}`} id={`popup-${name}`} onMouseDown={handleOverlay}>
      <div className={`popup__container popup__container_type_${name}`}>
        <button type="button" className="popup__close-btn" aria-label="Закрыть окно" onClick={onClose} />
        {children}
      </div>
    </section>
  );

};

export default Popup;
