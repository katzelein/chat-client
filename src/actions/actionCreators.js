import * as types from './actionTypes';

export const fetchUser = (userId) => {
  return {
    type: types.FETCH_USER,
    userId
  }
}

export const toggleUserTyping = (userTyping) => {
  return {
    type: types.TOGGLE_USER_TYPING,
    userTyping
  }
}