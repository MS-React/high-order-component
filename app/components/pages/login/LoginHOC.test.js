import React from 'react';
import LoginHOC from './LoginHOC';
import LoginFormTop from './LoginFormTop';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';

const mockStore = configureMockStore();
const store = mockStore({});
const HocComponent = LoginHOC(LoginFormTop);

function setup(props) {
  return shallow(<HocComponent {...props} />);
}

describe('<LoginHOC /> component', () => {
  let defaultProps = {
    actions: {
      login: jest.fn()
    },
    auth: {
      authenticating: false,
      isAuthenticated: false,
      error: false,
      errorMessage: null
    },
    store: store
  };
  let wrapper;
  let hocComponent;
  let instance;

  it('renders itself', () => {
    wrapper = setup(defaultProps);
    hocComponent = wrapper.dive();

    expect(hocComponent.state()).toEqual({
      username: '',
      password: ''
    });
  });

  it('should change state from component', () => {
    wrapper = setup(defaultProps);
    hocComponent = wrapper.dive();

    instance = hocComponent.instance();
    instance.handleOnChange({
      target: {
        name: 'username',
        value: 'JohnDoe'
      }
    });
    instance.handleOnChange({
      target: {
        name: 'password',
        value: '1234'
      }
    });

    expect(hocComponent.state()).toEqual({
      username: 'JohnDoe',
      password: '1234'
    });
  });

  it('should call action from login when form is submitted', () => {
    const loginStub = jest.fn();
    wrapper = setup(defaultProps);
    hocComponent = wrapper.dive();
    instance = hocComponent.instance();
    instance.props.actions.login = loginStub;

    instance.handleOnSubmit({
      preventDefault: jest.fn
    });

    expect(loginStub).toHaveBeenCalledWith({
      username: '',
      password: ''
    });
  });
});
