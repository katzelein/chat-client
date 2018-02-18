import initialState from './initialState';
import { TOGGLE_USER_TYPING } from '../actions/actionTypes';
import _ from 'lodash';

const messages = (state = initialState.messages, action) => {
  let newState;

  switch (action.type) {

    case TOGGLE_USER_TYPING:
      let oldUsers = state.usersTyping;
      let newUsers = [
        ...oldUsers,
        action.userTyping
      ]

      newState = {
        ...state,
        usersTyping: newUsers
      };
      return newState;

    default:
      return state;
  }
}

export default messages;