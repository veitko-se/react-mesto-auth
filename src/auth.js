/** Класс для работы с API сервера */
class Auth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
   // this._authorization = headers.authorization;
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
  register(email, password) {
    return this._request(`/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({password, email})
    })
  }

  authorize(email, password) {
    return this._request(`/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({password, email})
    })
    .then((data) => { console.log(data);
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
  }
}

/** экземляр класса Api*/
const auth = new Auth({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    // authorization: 'c024f246-bb18-41cb-8ec3-55e361b94019',
    'Content-Type': 'application/json'
  }
});

export default auth;
