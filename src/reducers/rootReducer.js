import { combineReducers } from 'redux';
import accounts from './accountsReducer';
import messages from './messagesReducer';

const rootReducer = combineReducers({
  accounts,
  messages
});

export default rootReducer;