/**
 * @file app.tsx
 * @author afcfzf(9301462@qq.com)
 */

import { render } from 'react-dom';
import { Home } from './pages/home';
import { connect, MapStateToPropsParam, Provider } from 'react-redux';
import { ContextState, store } from './store/store';

const root = document.querySelector('#app');

const mapStateToProps = (
  state: MapStateToPropsParam<ContextState, any, any>,
  props: Record<string, any>,
): Record<string, any> => {
  console.log('====state: ', state, props);

  return {
    userInfo: {
      userName: 'not_login',
      userAge: -1,
    },
  };
};

const mapDispatchToProp = (dispatch: any, ownProps: any): any => ({
  setUserName(userName: string) {
    console.log('==== ownProps: ', ownProps);
    dispatch({ type: 'update_user_name', payload: userName });
  },
});

const App = connect(mapStateToProps, mapDispatchToProp)(Home);

render(<Provider store={store}><App /></Provider>, root);
