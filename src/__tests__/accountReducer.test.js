import React from 'react';
import ReactDOM from 'react-dom';
import * as types from '../actions/actionTypes';
import accountsReducer from '../reducers/accountsReducer';

describe('accounts reducer', () => {
  const accountsInitialState = {
    users: [
      {
        id: 1,
        firstName: 'Laura',
        lastName: 'Linney',
        initials: 'LL'
      },
      {
        id: 2,
        firstName: 'Rob',
        lastName: 'Pattinson',
        initials: 'RP'
      }
    ],
    selectedSender: null,
    selectedReceiver: null
  }
  it('should return the initial state', () => {
    expect(accountsReducer(undefined, {})
      ).toEqual(accountsInitialState)
  })
  it('should handle FETCH_SENDER', () => {
    expect(
      accountsReducer(accountsInitialState, {
        type: types.FETCH_SENDER,
        userId: 1
      }).selectedSender
    ).toEqual(accountsInitialState.users[0])
  })

  it('should handle FETCH_RECEIVER', () => {
    expect(
      accountsReducer(accountsInitialState, {
        type: types.FETCH_RECEIVER,
        userId: 2
      }).selectedReceiver
    ).toEqual(accountsInitialState.users[1])
  })
})