/**
 * @file index.tsx
 * @author afcfzf(9301462@qq.com)
 */

import { createContext, useContext } from 'react';
import { ContextState } from '../../store/store';

export type ContextValue = ContextState;

export const AppContext = createContext<ContextValue | null>(null);

export const useAppContextValue = (): ContextValue => {
  const value = useContext<ContextValue | null>(AppContext);

  if (!value) {
    throw new Error('useAppContext must under AppContext');
  }

  return value;
};
