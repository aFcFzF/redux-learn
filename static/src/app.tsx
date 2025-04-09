/**
 * @file app.tsx
 * @author afcfzf(9301462@qq.com)
 */

import ReactDOM from 'react-dom';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home';
import { Menu, MenuProps } from 'antd';
import { MailOutlined, SettingOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router';
import { Empty } from './pages/Empty';

const PREFIX = 'baizhun';

const menus: MenuProps['items'] = [
  {
    key: `/${PREFIX}/home`,
    label: '首页',
    icon: <MailOutlined />,
  },
  {
    key: `/${PREFIX}/empty`,
    label: '空页面',
    icon: <SettingOutlined />,
  },
];

const App = (props: any): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{ display: 'flex', minWidth: 2600, minHeight: 500, background: '#eee' }}>
      <Menu
        style={{ flex: 'none' }}
        selectedKeys={[location.pathname]}
        items={menus}
        onClick={val => navigate(val.key)}
      />
      <div style={{ flex: 'auto' }}>
        <Routes>
          <Route path={`/${PREFIX}/home`} Component={Home} {...props} />
          <Route path={`/${PREFIX}/empty`} Component={() => <Empty {...props} />} />
          <Route path="*" Component={() => <Navigate to={`/${PREFIX}/home`} replace />} />
        </Routes>
      </div>
    </div>
  );
};


interface MicroProps {
  // 子应用根节点
  container?: HTMLElement;
  // 子应用路由baseName
  routerBaseName?: string;
  // 子应用鉴权token
  cmAuthToken?: string;
  // 向父应用发消息
  postMessage?: (payload: { msgType: 'refresh-auth-token'; }) => void;
}

const getMountTargetEl = (container?: HTMLElement): HTMLElement | null => (container || document).querySelector('#app-entry');

// 渲染函数
const render = (props: MicroProps): void => {
  const { container, routerBaseName } = props;

  ReactDOM.render(<BrowserRouter basename={container ? routerBaseName : '/'}>
    <App {...props} />
    </BrowserRouter>, getMountTargetEl(container));
};

// bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
export const bootstrap = async (): Promise<void> => {};

// 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
export const mount = async (props: MicroProps): Promise<void> => {
  render(props);
};

// 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
export const unmount = async (props: MicroProps): Promise<void> => {
  const { container } = props;
  const targetEl = getMountTargetEl(container);
  targetEl && ReactDOM.unmountComponentAtNode(targetEl);
};

// @ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}
