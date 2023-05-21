import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards, stateLoading}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content">

      <section className="profile">
        <div className="profile__avatar-container">
          <img src={currentUser.avatar} alt="Аватар" className="profile__avatar"/>
          <button type="button" className="profile__avatar-btn" aria-label="Изменить аватар" onClick={onEditAvatar} />
        </div>
        <div className="profile__info">
          <h1 className={`profile__info-title ${stateLoading&&'placeholder-loading'}`}>{currentUser.name}</h1>
          <button type="button" className="profile__edit-btn" aria-label="Редактировать профиль" onClick={onEditProfile} />
          <h2 className={`profile__info-subtitle ${stateLoading&&'placeholder-loading'}`}>{currentUser.about}</h2>
        </div>
        <button type="button" className="profile__add-btn" aria-label="Добавить фото" onClick={onAddPlace} />
      </section>

      <section className="elements" aria-label="Места">
        {cards.map(card => <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>)}
      </section>

    </main>
  );
};

export default Main;
