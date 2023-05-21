import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like-btn ${isLiked && 'element__like-btn_active'}`
  );;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="element">
      <img src={card.link} alt={card.name} className="element__image" onClick={handleClick} />
      {isOwn && <button type="button" className="element__trash-btn" aria-label="Удалить" onClick={handleDeleteClick} />}
      <div className="element__footer">
        <h3 className="element__text">{card.name}</h3>
        <div className="element__like">
          <button type="button" className={cardLikeButtonClassName} aria-label="Нравится" onClick={handleLikeClick}></button>
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
