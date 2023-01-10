// Создан файл api.js , внутри которого описаны запросы к серверу. Запросы к серверу не должны быть внутри
// модулей или index.js .
// Каждый метод, который включает обращение к серверу, содержит return fetch , то есть возвращает объект
// Promise .
// Все операции над DOM включены внутрь цепочки промисов.
// Ответ от сервера всегда проверяется на корректность:

// .then(res => {
//   if (res.ok) {
//   return res.json();
//   }
//   // если ошибка, отклоняем промис
//   return Promise.reject(`Ошибка: ${res.status}`);
//   });

//   Цепочка промисов продолжается вне функций api.js благодаря возврату из функций промиса: return fetch


  const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-18/',
    headers: {
      authorization: 'd95e8e0f-5717-4536-87da-f10af028f83a',
      'Content-Type': 'application/json; charset=UTF-8'
    }
  }

  export const getUserProfile = () => {
    return fetch(`${config.baseUrl}users/me`, {
      method: 'GET',
      headers: config.headers
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
         return Promise.reject(res.status);
      })
  }

  export const getCards = () => {
    return fetch(`${config.baseUrl}cards`, {
      method: 'GET',
      headers: config.headers
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
         return Promise.reject(res.status);
      })
  }

  export const postCard = (cardName, cardUrl) => {
    return fetch(`${config.baseUrl}cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: cardName,
        link: cardUrl
      }),
      headers: config.headers
      })
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
         return Promise.reject(res.status);
      })
  }

  export const likeCard = (cardId) => {
    return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
         return Promise.reject(res.status);
      })
  }

  export const dislikeCard = (cardId) => {
    return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
         return Promise.reject(res.status);
      })
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
         return Promise.reject(res.status);
      })
  }

  export const patchAvatar = (avatarUrl) => {

    return fetch(`${config.baseUrl}users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
      headers: config.headers
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
         return Promise.reject(res.status);
      })
  }
