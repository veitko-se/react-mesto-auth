/** Класс для работы с API сервера */
class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._authorization = headers.authorization;
    this._headers = headers;
  }

  /** приватный метод - проверка ответа сервера */
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  /** приватный метод - универсальный запрос с проверкой ответа */
  _request(endpoint, options) {
    return fetch(this._baseUrl + endpoint, options)
      .then(this._checkResponse)
  }

  /** загрузить данные о пользователе с сервера */
  loadUserInfo() {
    return this._request(`/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
  }

  /** обновить информацию о пользователе */
  updateUserInfo({name, about}) {
    return this._request(`/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name, about
      })
    })
  }

  /** обновить аватар */
  updateUserAvatar({avatar}) {
    return this._request(`/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
  }

  /** загрузить карточки с сервера */
  loadInitialCards() {
    return this._request(`/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
  }

  /** отправить карточку на сервер */
  pushCard({ name, link }) {
    return this._request(`/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name, link
      })
    })
  }

  /** удалить карточку на сервере */
  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  /** поставить/удалить лайк на сервере */
  changeLikeCardStatus(cardId, isLike) {
    const currMethod = (isLike ? 'PUT' : 'DELETE');
    return this._request(`/cards/${cardId}/likes`, {
      method: currMethod,
      headers: this._headers
    })
  }
}

/** экземляр класса Api*/
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: 'c024f246-bb18-41cb-8ec3-55e361b94019',
    'Content-Type': 'application/json'
  }
});

export default api;
