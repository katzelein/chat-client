import initialState from './initialState';
import {
  USER_IS_TYPING,
  USER_STOPPED_TYPING,
  SEND_NEW_MESSAGE
} from '../actions/actionTypes';
import _ from 'lodash';

const messages = (state = initialState.messages, action) => {

  switch (action.type) {

    case USER_IS_TYPING:
      let oldUsers = state.usersTyping;
      let oldMessages = state.messageList;

      let newUsers = [
        ...oldUsers,
        action.userTyping
      ]
      let messageTemplate = {
        senderId: action.userTyping,
        isTyping: true
      }
      let newMessages = [
        ...oldMessages,
        messageTemplate
      ]

      return {
        ...state,
        usersTyping: newUsers,
        messageList: newMessages
      };

    case USER_STOPPED_TYPING:
      let oldTypingUsers = state.usersTyping;
      let newTypingUsers = _.reject(oldTypingUsers, user => {
        return user === action.userTyping
      });
      let oldMessagesList = state.messageList;
      let newMessagesList = _.reject(oldMessagesList, message => {
        return message.senderId === action.userTyping && message.isTyping
      })

      return {
        ...state,
        usersTyping: newTypingUsers,
        messageList: newMessagesList
      }

    case SEND_NEW_MESSAGE:
      let oldUsersTyping = state.usersTyping;
      let newUsersTyping = _.reject(oldUsersTyping, user => {
        return user === action.newMessage.senderId
      });

      let oldList = state.messageList;
      let newList = _.reject(oldList, msg => {
        return msg.senderId === action.newMessage.senderId && msg.isTyping
      });

      newList = [
        ...newList,
        action.newMessage
      ]

      return {
        ...state,
        messageList: newList,
        usersTyping: newUsersTyping
      }

    default:
      return state;
  }
}

export default messages;