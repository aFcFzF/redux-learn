/**
 * @file store.ts
 * @author afcfzf(9301462@qq.com)
 */

import { create } from 'zustand';

export interface ContextState {
  userInfo: {
    userName: string;
    userAge: number;
  };

  list: { name: string; age: number; }[];

  updateUserInfo: (params: Partial<ContextState['userInfo']>) => void;
}

export const useStore = create<ContextState>(set => ({
  userInfo: {
    userName: 'unknown',
    userAge: 3,
  },

  list: [],

  updateUserInfo: (params: Partial<ContextState['userInfo']>) => set(prev => ({
    userInfo: {
      ...prev.userInfo,
      ...params,
    },
  })),
}));

// const store = useStore();
// console.log('初始==== state: ', store);

// console.log('=== userInfo: ', store.userInfo);

// store.subscribe((state) => {
//   console.log('=== state变化', state);
// });

// state.updateUserInfo({ userName: 'afcfzf' });

