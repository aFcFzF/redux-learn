/**
 * @file index.tsx
 * @author markJia(9301462@qq.com)
 */

import { useState } from 'react';
import { Button } from 'antd';
import { UserInfo } from '../../components/UserInfo';

export const Home = (): JSX.Element => {
  const [userName, setUserName] = useState<string>('');

  const onClick = (): void => {
    setUserName('afcfzf');
  };

  console.log('=== home');

  return (
    <div>
      <div><UserInfo userName={userName} /></div>
      <div>home页_{userName}</div>
      <Button onClick={onClick}>登录</Button>
    </div>
  );
};
