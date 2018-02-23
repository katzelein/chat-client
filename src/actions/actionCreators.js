import * as types from './actionTypes';

export const fetchSender = userId => ({
  type: types.FETCH_SENDER,
  userId,
});

export const fetchReceiver = userId => ({
  type: types.FETCH_RECEIVER,
  userId,
});

export const userIsTyping = userTyping => ({
  type: types.USER_IS_TYPING,
  userTyping,
});

export const userStoppedTyping = userTyping => ({
  type: types.USER_STOPPED_TYPING,
  userTyping,
});

export const sendNewMessage = newMessage => ({
  type: types.SEND_NEW_MESSAGE,
  newMessage,
});
