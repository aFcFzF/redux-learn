/**
 * @file app.tsx
 * @author afcfzf(9301462@qq.com)
 */

import { render } from 'react-dom';
import { Home } from './pages/home';

const root = document.querySelector('#app');
render(<Home />, root);
