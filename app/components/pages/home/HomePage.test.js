import React from 'react';
import { shallow } from 'enzyme';
import { HomePage, mapDispatchToProps, mapStateToProps } from './HomePage';
import initialState from '../../../reducers/initialState';

function setup(props) {
  return shallow(<HomePage {...props} />);
}

describe('<HomePage /> component', () => {
  it('renders itself', () => {
    const wrapper = setup({
      usersActions: {
        getUsers: jest.fn(),
        selectUser: jest.fn()
      }
    });

    expect(wrapper.find('Header')).toHaveLength(1);
    expect(wrapper.find('.container')).toHaveLength(1);
  });

  describe('mapStateToProps functions', () => {
    it('should return the initial state of users module', () => {
      const expectedProps = {
        users: []
      };

      const props = mapStateToProps(Object.assign({}, initialState));

      expect(props).toEqual(expectedProps);
    });
  });

  describe('mapDispatchToProps functions', () => {
    it('usersActions prop should be defined', () => {
      const dispatch = () => {};
      const props = mapDispatchToProps(dispatch);

      expect(props.usersActions).toBeDefined();
    });

    it('should return the binded actions', () => {
      const dispatch = () => {};
      const expectedActions = [
        'loadingUsersBegin',
        'loadingUsersComplete',
        'loadingUsersFailed',
        'createUsersSuccess',
        'selectUsersSuccess',
        'getUsersSuccess',
        'updateUsersSuccess',
        'deleteUsersSuccess',
        'selectUser',
        'deleteUser',
        'updateUser',
        'createUser',
        'getUsers'
      ];

      const props = mapDispatchToProps(dispatch);

      expect(Object.keys(props.usersActions)).toEqual(expectedActions);
    });
  });

  describe('setSelectedRow handler', () => {
    it('should select user', () => {
      const user = {
        id: 'id'
      };
      const selectUser = jest.fn();
      const wrapper = setup({
        usersActions: {
          selectUser,
          getUsers: () => {},
          createUser: () => {},
          updateUser: () => {},
          deleteUser: () => {}
        },
      });

      wrapper.instance().setSelectedRow(user);

      expect(selectUser).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleUserActionType handler', () => {
    it('should return Add handler', () => {
      const type = 'add';
      const user = {
        id: 'id'
      };
      const createUser = jest.fn();
      const wrapper = setup({
        usersActions: {
          selectUser: () => {},
          getUsers: () => {},
          createUser,
          updateUser: () => {},
          deleteUser: () => {}
        },
      });

      wrapper.instance().handleUserActionType(type, user);

      expect(createUser).toHaveBeenCalledTimes(1);
    });

    it('should return Edit handler', () => {
      const type = 'edit';
      const user = {
        id: 'id'
      };
      const updateUser = jest.fn();
      const wrapper = setup({
        usersActions: {
          selectUser: () => {},
          getUsers: () => {},
          createUser: () => {},
          updateUser,
          deleteUser: () => {}
        },
      });

      wrapper.instance().handleUserActionType(type, user);

      expect(updateUser).toHaveBeenCalledTimes(1);
    });

    it('should return Delete handler', () => {
      const type = 'delete';
      const user = {
        id: 'id'
      };
      const deleteUser = jest.fn();
      const wrapper = setup({
        usersActions: {
          selectUser: () => {},
          getUsers: () => {},
          createUser: () => {},
          updateUser: () => {},
          deleteUser
        },
      });

      wrapper.instance().handleUserActionType(type, user);

      expect(deleteUser).toHaveBeenCalledTimes(1);
    });

    it('should return add Handler when type is other than add, edit, delete', () => {
      const type = 'other';
      const user = {
        id: 'id'
      };
      const createUser = jest.fn();
      const wrapper = setup({
        usersActions: {
          selectUser: () => {},
          getUsers: () => {},
          createUser,
          updateUser: () => {},
          deleteUser: () => {}
        },
      });

      wrapper.instance().handleUserActionType(type, user);

      expect(createUser).toHaveBeenCalledTimes(1);
    });

    it('should return Add as default handler when no type is passed', () => {
      const type = undefined;
      const user = {
        id: 'id'
      };
      const createUser = jest.fn();
      const wrapper = setup({
        usersActions: {
          selectUser: () => {},
          getUsers: () => {},
          createUser,
          updateUser: () => {},
          deleteUser: () => {}
        },
      });

      wrapper.instance().handleUserActionType(type, user);

      expect(createUser).toHaveBeenCalledTimes(1);
    });
  });
});
