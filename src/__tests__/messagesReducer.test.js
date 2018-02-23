import React from 'react';
import ReactDOM from 'react-dom';
import * as types from '../actions/actionTypes';
import messagesReducer from '../reducers/messagesReducer';
import moment from 'moment'

describe('accounts reducer', () => {
  const messagesInitialState = {
    messageList: [],
    usersTyping: []
  }
  it('should return the initial state', () => {
    expect(messagesReducer(undefined, {})).toEqual(messagesInitialState)
  })
  it('should handle USER_IS_TYPING', () => {
    expect(
      messagesReducer(messagesInitialState, {
        type: types.USER_IS_TYPING,
        userTyping: 1
      }).usersTyping
    ).toEqual([1])

    expect(
      messagesReducer({
        messageList: [],
        usersTyping: [1]
      }, {
        type: types.USER_IS_TYPING,
        userTyping: 2
      }).usersTyping
    ).toEqual([1,2])
  })

  it('should handle USER_STOPPED_TYPING', () => {
    expect(
      messagesReducer({
        messageList: [],
        usersTyping: [2,1]
      }, {
        type: types.USER_STOPPED_TYPING,
        userTyping: 1
      }).usersTyping
    ).toEqual([2])

    expect(
      messagesReducer({
        messageList: [],
        usersTyping: [2]
      }, {
        type: types.USER_STOPPED_TYPING,
        userTyping: 2
      }).usersTyping
    ).toEqual([])
  })

  it('should handle SEND_NEW_MESSAGE', () => {

    const newMessage1 = {
      senderId: 1,
      receiverId: 2,
      messageText: 'You are way too young for me, Rob.',
      timeSent: moment()
    }

    const newMessage2 = {
      senderId: 2,
      isTyping: true
    }

    const newMessage3 = {
      senderId: 2,
      receiverId: 1,
      messageText: "That's what makes it fun!",
      timeSent: moment().add(10, 'seconds')
    }

    expect(
      messagesReducer(messagesInitialState, {
        type: types.SEND_NEW_MESSAGE,
        newMessage: newMessage1,
      })
    ).toEqual({
      messageList: [newMessage1],
      usersTyping: []
    })

    expect(
      messagesReducer({
        messageList: [newMessage1, newMessage2],
        usersTyping: [2]
      }, {
        type: types.SEND_NEW_MESSAGE,
        newMessage: newMessage3,
      })
    ).toEqual({
      messageList: [newMessage1, newMessage3],
      usersTyping: []
    })
  })
})