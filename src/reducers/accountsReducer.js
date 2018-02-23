import initialState from './initialState';
import { FETCH_SENDER, FETCH_RECEIVER } from '../actions/actionTypes';
import _ from 'lodash';

const accounts = (state = initialState.accounts, action) => {
  switch (action.type) {

    case FETCH_SENDER:
      const selectedSender =
        _.find(state.users, (user) => { return user.id === action.userId });
      return {
        ...state,
        selectedSender
      };

    case FETCH_RECEIVER:
      const selectedReceiver =
        _.find(state.users, (user) => { return user.id === action.userId });
      return {
        ...state,
        selectedReceiver
      };

    default:
      return state;
  }
}

export default accounts;