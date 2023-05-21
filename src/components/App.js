import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup  from './EditProfilePopup';
import EditAvatarPopup   from './EditAvatarPopup';
import AddPlacePopup   from './AddPlacePopup';
import api from '../utils/api';
import { CurrentUserContext, user } from '../contexts/CurrentUserContext';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState(user.loadUser);
  const [cards , setCards] = React.useState([]);
  const [stateLoading, setState] = React.useState(true);

  React.useEffect(() => {
    Promise.all([api.loadUserInfo(), api.loadInitialCards()])
    .then(([newUserInfo, initialCards]) => {
      setCurrentUser(newUserInfo)
      setCards(initialCards);
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(()=>setState(false));
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard(null);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards(cardsCopy => cardsCopy.map(
        cardCopy => cardCopy._id === card._id ? newCard : cardCopy
      ));
    })
    .catch(err => console.log(`Ошибка: ${err}`));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards(cardsCopy => cardsCopy.filter(
        cardCopy => cardCopy._id !== card._id
      ));
    })
    .catch(err => console.log(`Ошибка: ${err}`));
  }

  function handleUpdateUser(newUserInfo) {
    api.updateUserInfo(newUserInfo)
    .then((userInfo) => {
      setCurrentUser(userInfo);
      closeAllPopups();
    })
    .catch(err => console.log(`Ошибка: ${err}`));
  }

  function handleUpdateAvatar(newAvatar) {
    api.updateUserAvatar(newAvatar)
    .then((userInfo) => {
      setCurrentUser(userInfo);
      closeAllPopups();
    })
    .catch(err => console.log(`Ошибка: ${err}`));
  }

  function handleAddPlaceSubmit(newCard) {
    api.pushCard(newCard)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(err => console.log(`Ошибка: ${err}`));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
          stateLoading={stateLoading}
        />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace ={handleAddPlaceSubmit} />
        <ImagePopup name="photo" card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
        <PopupWithForm name="confirm" /*isOpen={}*/ onClose={closeAllPopups} title="Вы уверены?" buttonText="Да" />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
