import React from 'react';
import ReactDOM from 'react-dom';
import * as actions from '../actions/actionCreators';
import * as types from '../actions/actionTypes'

describe('actions', () => {
  it('should set the sender', () => {
    const userId = 1;
    const expectedAction = {
      type: types.FETCH_SENDER,
      userId
    }
    expect(actions.fetchSender(userId)).toEqual(expectedAction)
  })

  it('should set the receiver', () => {
    const userId = 2;
    const expectedAction = {
      type: types.FETCH_RECEIVER,
      userId
    }
    expect(actions.fetchReceiver(userId)).toEqual(expectedAction)
  })

  it('should add a typing user', () => {
    const userTyping = 1;
    const expectedAction = {
      type: types.USER_IS_TYPING,
      userTyping
    }
    expect(actions.userIsTyping(userTyping)).toEqual(expectedAction)
  })

  it('should remove a user who has stopped typing', () => {
    const userTyping = 2;
    const expectedAction = {
      type: types.USER_STOPPED_TYPING,
      userTyping
    }
    expect(actions.userStoppedTyping(userTyping)).toEqual(expectedAction)
    })

  it('should send a new message', () => {
    const newMessage = {
      senderId: 2,
      receiverId: 1,
      messageText: 'I love you, Laura'
    };
    const expectedAction = {
      type: types.SEND_NEW_MESSAGE,
      newMessage
    }
    expect(actions.sendNewMessage(newMessage)).toEqual(expectedAction)
  })

  it('will send a message with no text to show a user is typing', () => {
    const newMessage = {
      senderId: 2,
      isTyping: true
    };
    const expectedAction = {
      type: types.SEND_NEW_MESSAGE,
      newMessage
    }
    expect(actions.sendNewMessage(newMessage)).toEqual(expectedAction)
  })
})