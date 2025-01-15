/**
 * @file index.tsx
 * @author markJia(9301462@qq.com)
 */

import { memo } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ContextValue } from '../Context';
import { Dispatch } from 'redux';

export const UserInfo = memo((): JSX.Element => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: ContextValue) => state.userInfo);

  const checkNeedUpdate = (userName: string) => async (_dispatch: Dispatch, getState: Function) => getState().userInfo.userName !== userName;

  const switchUserAction = (userName: string) => async (dispatch: Dispatch) => {
    const needUpdate = await dispatch(checkNeedUpdate(userName) as any);

    console.log('=== 是否更新', needUpdate);

    if (needUpdate) {
      dispatch({ type: 'update_user_name', payload: { userName: 'loading....' } });
      setTimeout(() => {
        dispatch({ type: 'update_user_name', payload: { userName } });
      }, 1000);
    }
  };

  return (
    <div>
      <div>用户名：{userInfo.userName}</div>
      <Button
        onClick={() => dispatch(switchUserAction('afcfzf'))}
      >换用户</Button>
    </div>
  );
});
