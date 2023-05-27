import Success from '../images/Success.svg';
import Fail from '../images/Fail.svg';
import Popup from './Popup';

function InfoTooltip({isOpen, onClose, name, isError}) {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <img src={isError ? Fail : Success} alt={isError ? 'Ошибка' : 'Успех'} className="popup__info-image"/>
      <h2 className={`popup__title popup__title_type_${name}`}>{isError ? 'Что-то пошло не так! Попробуйте ещё раз.' : 'Вы успешно зарегистрировались!'}</h2>
    </Popup>
  );
}

export default InfoTooltip ;
