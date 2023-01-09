import { request} from "./utils.js";
import { config } from "./constants.js";




export function getInitialCards() {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: 'GET'
  })
}

export function getUserInfo() {
  return request(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: 'GET'
  })
}


export function patchUserInfo(userName, userDesc) {
  return request(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userDesc
    })
  })
}

export function createNewCard(name, link) {
  return request(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
}

export function deleteCard(id) {
  return request(`${config.baseUrl}/cards/${id}`, {
    headers: config.headers,
    method: 'DELETE'
  })
}

export function addLike(id) {
  return request(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers,
  })
}

export function removeLike(id) {
  return request(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
}

export function changeAvatar(url) {
  return request(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({
      avatar: url
    })
  })
}
