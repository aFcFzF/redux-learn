/**
 * @file store.ts
 * @author afcfzf(9301462@qq.com)
 */

import {
  Action,
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
  Dispatch,
  Middleware,
} from 'redux';
import ThunkMiddleware from 'redux-thunk';

export interface ContextState {
  userInfo: {
    userName: string;
    userAge: number;
  };

  list: { name: string; age: number; }[];
}

export interface AppAction<T extends string, D> extends Action<T> {
  type: T;
  payload: D;
}

export type UserNameAction = AppAction<'update_user_name', { userName: string; }>;

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
  const result = next(action);
  console.log('== next state: ', store.getState());
  console.groupEnd();
  return result;
};

export const reducer = combineReducers({ list: listReducer, userInfo: userInfoReducer });
export const store = createStore(
  reducer,
  applyMiddleware(logger, ThunkMiddleware),
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
