import initialState from './initialState';
import { FETCH_USER } from '../actions/actionTypes';
import _ from 'lodash';

const accounts = (state = initialState.accounts, action) => {
  let newState;

  switch (action.type) {

    case FETCH_USER:
      const selectedUser =
        _.find(state.users, (user) => { return user.id === action.userId });
      newState = {
        ...state,
        selectedUser
      };
      return newState;

    default:
      return state;
  }
}

export default accounts;