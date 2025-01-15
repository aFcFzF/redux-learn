/**
 * @file official_test.ts
 * @author afcfzf(9301462@qq.com)
 */

import {
  legacy_createStore as legacyCreateStore,
  Action,
  combineReducers,
  applyMiddleware,
  Dispatch,
  Middleware,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { AppAction, ContextState, UserNameAction } from '../store/store';

const userInfoReducer = (state: ContextState['userInfo'] = { userName: 'not_login', userAge: -1 }, action: UserNameAction): ContextState['userInfo'] => {
  // console.log('执行了[userInfoReducer]', state, action);
  switch (action.type) {
    case 'update_user_name': {
      const { payload } = action;
      const { userName } = payload;

      return {
        ...state,
        userName,
      };
    }
    default: {
      return state;
    }
  }
};

const listReducer = (state: ContextState['list'] = [], action: AppAction<'add', ContextState['list'][number]>): ContextState['list'] => {
  // console.log('执行了[listReducer]', state, action);

  switch (action.type) {
    case 'add': {
      return [
        ...state,
        action.payload,
      ];
    }
    default: {
      return state;
    }
  }
};

const logger: Middleware = () => (next: Dispatch) => (action: Action) => {
  console.group(`==== group: ${action.type}`);
  console.info('== dispatching action', action);
  console.info('== before', store.getState());
  next(action);
  console.log('== next state: ', store.getState());
  console.groupEnd();
};

export const reducer = combineReducers({ list: listReducer, userInfo: userInfoReducer });
export const store = legacyCreateStore(
  reducer,
  applyMiddleware(thunkMiddleware, logger),
);

// console.log('=== 初始state: ', store.getState());
// store.subscribe(() => console.log('store变化', store.getState()));

// store.dispatch({
//   type: 'add',
//   payload: {
//     name: 'aaa',
//     age: 2,
//   },
// });

// store.dispatch({
//   type: 'update_user_name',
//   payload: {
//     userName: 'afcfzf',
//   },
// });

const thunkAction: any = (userName: string) => (dispatch: Dispatch) => {
  dispatch({
    type: 'update_user_name',
    payload: {
      userName: 'loading...',
    },
  });

  setTimeout(() => {
    dispatch({
      type: 'update_user_name',
      payload: {
        userName,
      },
    });
  }, 1000);
};

store.dispatch(thunkAction('afcfzf'));

// store.dispatch({
//   type: 'add',
//   payload: {
//     name: 'aaa',
//     age: 2,
//   },
// });
