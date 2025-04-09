/**
 * @file index.tsx
 * @author afcfzf(9301462@qq.com)
 */

import { Empty as AntdEmpty, Button } from 'antd';

export const Empty = (props: { postMessage: Function; cmAuthToken: string }): JSX.Element => {
  const { postMessage, cmAuthToken } = props;
  return (
  <>
    <AntdEmpty />
    cmAuthToken: {cmAuthToken}
    <Button type="primary" onClick={() => postMessage({ msgType: 'refresh-auth-token' })}>刷新</Button>
  </>
  );
};

