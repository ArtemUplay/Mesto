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

  _request(url, options) {
    return fetch(`${this._baseUrl}${url}`, options)
    .then(this._checkResponse)
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(response.status);
  }

  getCards() {
    return this._request(`cards`, {
      method: 'GET',
      headers: this._headers
    })
  }

  likeCard(cardId) {
   return this._request(`cards/likes/${cardId}`, {
          method: 'PUT',
          headers: this._headers
        })
  }

  dislikeCard(cardId) {
    return this._request(`cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
}

  postCard({ name, position }) {
    return this._request(`cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        link: position
      }),
      headers: this._headers
    })
  }

  delCard(cardId) {
    return this._request(`cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
  })
}

  getUserProfile() {
    return this._request(`users/me`, {
      method: 'GET',
      headers: this._headers
    })
  }

  patchProfile({ name, about }) {

    return this._request(`users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        about: about
      }),
      headers: this._headers
    })
  }

  patchAvatar({ avatar }) {
    return this._request(`users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: avatar,
      }),
      headers: this._headers
    })
  }

}

export const api = new Api({ data: config });
