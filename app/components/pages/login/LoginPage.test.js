import React from 'react';
import LoginPage from './LoginPage';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

const mockStore = configureMockStore();
const store = mockStore({});

describe('<LoginPage /> component', () => {
  it('renders itself', () => {
    const wrapper = mount(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    expect(wrapper.find('section')).toHaveLength(1);
    expect(wrapper.find('LoginNavigation')).toHaveLength(1);
    expect(wrapper.find('LoginFormMain')).toHaveLength(1);
  });
});
