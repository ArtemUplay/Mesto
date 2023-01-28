const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-18/',
  headers: {
    authorization: 'd95e8e0f-5717-4536-87da-f10af028f83a',
    'Content-Type': 'application/json; charset=UTF-8'
  }
}

 class Api {
  constructor({ data }) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(response.status);
  }

  getCards() {
    return fetch(`${this._baseUrl}cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  dislikeCard(cardId) {
    return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  postCard({ name, position }) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        link: position
      }),
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  delCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  getUserProfile() {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  patchProfile({ name, about }) {

    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        about: about
      }),
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  patchAvatar({ avatar }) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: avatar,
      }),
      headers: this._headers
    })
      .then(this._checkResponse)
  }

}

export const api = new Api({ data: config });
