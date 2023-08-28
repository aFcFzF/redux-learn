/**
 * @file index.tsx
 * @author markJia(markjia@tencent.com)
 */

import React from 'react';
import { useRefCallback } from '@tencent/glue-react-use';

export const Home = (): JSX.Element => {
  const onClick = useRefCallback(() => {
    console.log('可以的');
  });

  return (
    <div onClick={onClick}>home页</div>
  );
};
