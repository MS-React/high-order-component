import React from 'react';
import LoginFormTop from './LoginFormTop';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

function setup(store) {
  return mount(<LoginFormTop store={store} />);
}

describe('<LoginFormTop /> component', () => {
  const mockStore = configureMockStore();
  let store;

  beforeEach(function () {
    store = mockStore({});
  });

  it('renders itself', () => {
    const wrapper = setup(store);

    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper.find('FormGroup')).toHaveLength(2);
    expect(wrapper.find('Label')).toHaveLength(2);
    expect(wrapper.find('Input')).toHaveLength(2);
    expect(wrapper.find('Button')).toHaveLength(1);
    expect(wrapper.find('.alert .alert-danger')).toHaveLength(0);
  });

  it('should render auth error message', () => {
    store = mockStore({
      auth: {
        error: true,
        errorMessage: 'Invalid credentials.'
      }
    });
    const wrapper = setup(store);

    expect(wrapper.find('.alert .alert-danger')).toHaveLength(1);
  });
});
