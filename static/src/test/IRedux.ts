/**
 * @file IRedux.ts
 * @author afcfzf(9301462@qq.com)
 */

export interface Action<T extends string> {
  type: T;
  [prop: string]: any;
}

type Reducer<T extends Record<any, any>, A extends Action<string>> = (state: T | undefined, action: A) => T;

class Store<T extends Record<any, any>, A extends Action<string>> {
  state?: T;

  readonly reducer: Reducer<T, A>;

  readonly listener: Function[] = [];

  constructor(reducer: Reducer<T, A>, enhance: any | undefined) {
    this.reducer = reducer;
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    this.state = reducer(undefined, { type: 'iRedux' } as A);
    enhance(this);
  }

  public getState(): T {
    return this.state as T;
  }

  public dispatch = (action: A): void => {
    this.state = this.reducer(this.state, action);
    this.listener.forEach(fn => fn());
  };

  public subscribe(fn: Function): void {
    this.listener.push(fn);
  }
}

export const legacyCreateStore = <T extends Record<any, any>, A extends Action<string>>(reducer: Reducer<T, A>, enhance: undefined | any): Store<T, A> => {
  const store = new Store<T, A>(reducer, enhance);

  return store;
};

export const combineReducers = <T extends Record<string, Reducer<any, any>>>(reducerDict: T): Reducer<Record<keyof T, any>, any> => {
  const keys = Object.keys(reducerDict);

  const initState = keys.reduce((state, key) => ({
    ...state,
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    [key]: reducerDict[key](undefined, { type: 'iRedux_combineReducer_init' }),
  }), {}) as Record<keyof T, any>;

  const reducer: Reducer<Record<any, any>, any> = (state = initState, action): T => {
    keys.forEach((key) => {
      state[key] = reducerDict[key](state[key], action);
    });

    // 返回一个新state
    return state;
  };

  return reducer;
};

export const applyMiddleware = (...middlewares: Function[]) => (store: any) => {
  let { dispatch } = store;

  middlewares.reverse().forEach((chain) => {
    const next = chain(store)(dispatch);
    dispatch = next;
  });

  store.dispatch = dispatch;
};

// 第1次调用: 调第2个中间件
// 第2次调用：调第3个中间件
// 第3次调用：调第4个中间件
// ...
// 最后1次调用：真正的dispatch
