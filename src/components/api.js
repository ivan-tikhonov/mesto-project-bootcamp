
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-3',
  headers: {
    authorization: 'b9b54368-cc4e-43c7-8fef-39eba15f44ab',
    'Content-Type': 'application/json'
  }
}

export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: 'GET'
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
}

export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: 'GET'
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
}


export function patchUserInfo(userName, userDesc) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userDesc
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
}

export function newCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
}

export function deleteCard(id) {
  return fetch(`${config.baseUrl}/cards/${id} `, {
    headers: config.headers,
    method: 'DELETE'
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
}

export function addLike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
}

export function removeLike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
}
