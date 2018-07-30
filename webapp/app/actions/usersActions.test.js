import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { omit } from '../utils/functions';
import {
  createUser,
  getUsers,
  selectUser,
  updateUser,
  deleteUser
} from './usersActions';
import * as userService from '../services/userService';
import { USERS } from '../actions/actionTypes';

describe('usersActions', () => {
  const middlewares = [
    thunkMiddleware
  ];
  const mockStore = configureStore(middlewares);
  const defaultReponseStatusProps = {
    status: 200,
    statusText: 'OK',
    ok: true
  };
  const defaultPaginatedResponse = {
    count: 1,
    page: 0,
    limit: 0,
    totalPages: 1,
    docs: [{ foo: 'bar' }]
  };
  let store;

  function createResponse(response) {
    return {
      ...omit(response, ['data']),
      data: { ...response.data }
    };
  }

  beforeEach(() => {
    store = mockStore({});

    userService.createUsers = jest.fn(data => Promise.resolve(createResponse({
      ...defaultReponseStatusProps,
      data
    })));

    userService.deleteUsers = jest.fn(() => Promise.resolve(createResponse({
      ...defaultReponseStatusProps,
      statusCode: 204
    })));

    userService.fetchUsers = jest.fn(() => Promise.resolve(createResponse({
      ...defaultReponseStatusProps,
      data: defaultPaginatedResponse
    })));

    userService.updateUsers = jest.fn((userId, user) => Promise.resolve(createResponse({
      ...defaultReponseStatusProps,
      data: {
        _id: userId,
        ...user
      }
    })));
  });

  afterEach(() => {
    userService.createUsers.mockClear();
    userService.deleteUsers.mockClear();
    userService.fetchUsers.mockClear();
    userService.updateUsers.mockClear();
  });

  describe('getUsers', () => {
    it('should be defined', () => {
      expect(userService.fetchUsers).toBeDefined();
    });

    it('should be a function', () => {
      expect(userService.fetchUsers).toEqual(expect.any(Function));
    });

    describe('when the service call is successful', () => {
      it('should create an action to get users', async () => {
        const expectedActions = [
          { type: USERS.LOADING_BEGIN },
          { type: USERS.LOADING_COMPLETE },
          {
            type: USERS.GET_ALL_SUCCESS,
            payload: {
              count: 1,
              page: 0,
              limit: 0,
              totalPages: 1,
              users: [{ foo: 'bar' }]
            }
          }
        ];

        const getUsersActionResult = await getUsers();

        store.dispatch(getUsersActionResult).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });

    describe('when the service call fails', () => {
      // TODO add tests for createAction/handleAction middleware when the promise fails
    });
  });

  describe('selectUser', () => {
    describe('when the service call is successful', () => {
      it('should create an action to select a user', async () => {
        // Arrange
        const expectedActions = [{
          payload: {
            _id: 'fake.id.john',
            name: 'John Doe'
          },
          type: USERS.SELECT_SUCCESS
        }];

        // Act
        await store.dispatch(selectUser({
          _id: 'fake.id.john',
          name: 'John Doe'
        }));

        // Assert
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    describe('when the service call fails', () => {
      // TODO add tests for createAction/handleAction middleware when the promise fails
    });
  });

  describe('createUsers', () => {
    it('should be defined', () => {
      expect(userService.createUsers).toBeDefined();
    });

    it('should be a function', () => {
      expect(userService.createUsers).toEqual(expect.any(Function));
    });

    describe('when the service call is successful', () => {
      it('should create an action to create a user', async () => {
        // Arrange
        const expectedActions = [
          { type: USERS.LOADING_BEGIN },
          { type: USERS.LOADING_COMPLETE },
          {
            type: USERS.CREATE_SUCCESS,
            payload: {
              name: 'John Doe'
            }
          }
        ];
        // Act
        await store.dispatch(createUser({ name: 'John Doe' }));

        // Assert
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    describe('when the service call fails', () => {
      // TODO add tests for createAction/handleAction middleware when the promise fails
    });
  });

  describe('updateUsers', () => {
    it('should be defined', () => {
      expect(userService.updateUsers).toBeDefined();
    });

    it('should be a function', () => {
      expect(userService.updateUsers).toEqual(expect.any(Function));
    });

    describe('when the service call is successful', () => {
      it('should create an action to update a user', async () => {
        // Arrange
        const expectedActions = [
          { type: USERS.LOADING_BEGIN },
          { type: USERS.LOADING_COMPLETE },
          {
            type: USERS.UPDATE_SUCCESS,
            payload: {
              _id: 'fake.id.john',
              name: 'John Doe Jr.'
            }
          }
        ];

        // Act
        await store.dispatch(updateUser({
          _id: 'fake.id.john',
          name: 'John Doe Jr.'
        }));

        // Assert
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('deleteUsers', () => {
    it('should be defined', () => {
      expect(userService.deleteUsers).toBeDefined();
    });

    it('should be a function', () => {
      expect(userService.deleteUsers).toEqual(expect.any(Function));
    });

    describe('when the service call is successful', () => {
      it('should create an action to delete a user', async () => {
        // Arrange
        const expectedActions = [
          { type: USERS.LOADING_BEGIN },
          { type: USERS.LOADING_COMPLETE },
          {
            type: USERS.DELETE_SUCCESS,
            payload: {
              _id: 'fake.id.john',
              name: 'John Doe'
            }
          }
        ];

        // Act
        await store.dispatch(deleteUser({
          _id: 'fake.id.john',
          name: 'John Doe'
        }));

        // Assert
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
