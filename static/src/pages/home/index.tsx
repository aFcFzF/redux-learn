/**
 * @file index.tsx
 * @author markJia(9301462@qq.com)
 */

import { UserInfo } from '../../components/UserInfo';

export const Home = (): JSX.Element => {
  const onClick = (): void => {
    console.log('可以的');
  };

  return (
    <div>
      <div><UserInfo /></div>
      <div onClick={onClick}>home页</div>
    </div>
  );
};
