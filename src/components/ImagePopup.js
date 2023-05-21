import Popup from './Popup';

function ImagePopup({card, isOpen, onClose, name}) {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <img src={card ? card.link : ''} alt={card ? card.name : ''} className="popup__photo"/>
      <h2 className="popup__title popup__title_type_photo">{card ? card.name : ''}</h2>
    </Popup>
  );
}

export default ImagePopup;
