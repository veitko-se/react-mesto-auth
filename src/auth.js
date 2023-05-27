/** Класс для работы с API сервера */
class Auth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
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

  register(email, password) {
    return this._request(`/signup`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({password, email})
    })
  }

  authorize(email, password) {
    return this._request(`/signin`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({password, email})
    })
    .then((data) => {
      if (data.token){
        localStorage.setItem('token', data.token);
        return data;
      }
    })
  };

  checkToken(token) {
    return this._request(`/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.data);
  }
}

/** экземляр класса*/
const auth = new Auth('https://auth.nomoreparties.co');

export default auth;
