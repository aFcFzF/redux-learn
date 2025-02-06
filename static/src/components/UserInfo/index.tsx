/**
 * @file index.tsx
 * @author markJia(9301462@qq.com)
 */

export const UserInfo = ({ userName }: { userName: string; }): JSX.Element => {
  console.log('=== userInfo', userName);

  return (
    <div>
      <div>用户名：{userName}</div>
      {/* <Button
        onClick={() => updateUserInfo({ userName: 'afcfzf' })}
      >换用户</Button> */}
    </div>
  );
};
