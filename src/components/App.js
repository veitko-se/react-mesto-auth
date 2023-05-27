import {useState, useEffect} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup  from './EditProfilePopup';
import EditAvatarPopup   from './EditAvatarPopup';
import AddPlacePopup   from './AddPlacePopup';
import api from '../utils/api';
import {CurrentUserContext, user} from '../contexts/CurrentUserContext';
import {Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import auth from '../auth.js';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState(user.loadUser);
  const [cards, setCards] = useState([]);
  const [stateLoading, setState] = useState(true);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

 useEffect(() => {
    handleTokenCheck();
  }, [])

 useEffect(() => {
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

  function handleLogin(email) {
    setEmail(email);
    setLoggedIn(true);
  }

  function handleTokenCheck() {
    if (localStorage.getItem('token')){
      const token = localStorage.getItem('token');
      if (token&&(token!=='undefined')) {
        auth.checkToken(token)
        .then((data) => {
          if (data) {
            handleLogin(data.email);
            navigate('/', {replace: true})
          }
        })
        .catch(err => console.log(`Ошибка: ${err}`));
      };
    };
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header login={email} />
        <Routes>
          <Route path="*" element={<Navigate to="/sign-in"/>}/>
          <Route path="/" element={
            <ProtectedRoute element={Main} loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              stateLoading={stateLoading}
            />
          } />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
        </Routes>
        {loggedIn && <Footer />}
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
