/**
 * @file index.tsx
 * @author markJia(9301462@qq.com)
 */

import { useState } from 'react';
import { Button, message, Modal } from 'antd';

import axios from 'axios';

export const Home = (props: any): JSX.Element => {
  const [open, setOpen] = useState(false);

  const onClick = (): void => {
    setOpen(true);
  };

  console.log('=== home');

  const onRequest = (): void => {
    axios.post('https://dev.baizhun.cn/api/getUserInfo', {})
      .then((res) => {
        console.log('返回了', res);
      })
      .catch((res) => {
        console.log(res);
        message.error({ content: res.message, top: 300 });
      });
  };

  return (
    <div>
      <div style={{ padding: 30 }}>
        百准测试页
        <br />
        <br />
        <div> cmAuthToken: {props.cmAuthToken} </div>
      </div>
      <Modal centered open={open} onCancel={() => setOpen(false)} onOk={() => setOpen(false)} >
          modal内容
      </Modal>
      <Button onClick={onClick}>弹框</Button>&nbsp;
      <Button onClick={onRequest} >发请求</Button>
    </div>
  );
};
