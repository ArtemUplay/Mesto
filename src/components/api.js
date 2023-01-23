const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-18/',
  headers: {
    authorization: 'd95e8e0f-5717-4536-87da-f10af028f83a',
    'Content-Type': 'application/json; charset=UTF-8'
  }
}

export default class Api {
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
}

const api = new Api({ data: config });

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

export const getUserProfile = () => {
  return fetch(`${config.baseUrl}users/me`, {
    method: 'GET',
    headers: config.headers
  })
    .then(checkResponse)
  // .then((res) => {
  //   if (res.ok) {
  //     return res.json();
  //   }
  //    return Promise.reject(res.status);
  // })
}

// export const getCards = () => {
//   return fetch(`${config.baseUrl}cards`, {
//     method: 'GET',
//     headers: config.headers
//   })
//     .then(checkResponse)
// .then((res) => {
//   if (res.ok) {
//     return res.json();
//   }
//    return Promise.reject(res.status);
// })
// }

export const postCard = (cardName, cardUrl) => {
  return fetch(`${config.baseUrl}cards`, {
    method: 'POST',
    body: JSON.stringify({
      name: cardName,
      link: cardUrl
    }),
    headers: config.headers
  })
    .then(checkResponse)
  // .then((res) => {
  //   if (res.ok) {
  //     return res.json();
  //   }
  //    return Promise.reject(res.status);
  // })
}

export const delCard = (cardId) => {
  return fetch(`${config.baseUrl}cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(checkResponse)
  // .then((res) => {
  //   if (res.ok) {
  //     return res.json();
  //   }
  //    return Promise.reject(res.status);
  // })
}

export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(checkResponse)
  // .then((res) => {
  //   if (res.ok) {
  //     return res.json();
  //   }
  //    return Promise.reject(res.status);
  // })
}

export const dislikeCard = (cardId) => {
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(checkResponse)
  // .then((res) => {
  //   if (res.ok) {
  //     return res.json();
  //   }
  //    return Promise.reject(res.status);
  // })
}

export const patchProfile = (userName, userPosition) => {

  return fetch(`${config.baseUrl}users/me`, {
    method: 'PATCH',
    body: JSON.stringify({
      name: userName,
      about: userPosition
    }),
    headers: config.headers
  })
    .then(checkResponse)
  // .then((res) => {
  //   if (res.ok) {
  //     return res.json();
  //   }
  //    return Promise.reject(res.status);
  // })
}

export const patchAvatar = (avatarUrl) => {

  return fetch(`${config.baseUrl}users/me/avatar`, {
    method: 'PATCH',
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
    headers: config.headers
  })
    .then(checkResponse)
  // .then((res) => {
  //   if (res.ok) {
  //     return res.json();
  //   }
  //    return Promise.reject(res.status);
  // })
}

export {
  api
}