import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../../actions/authActions';

const LoginHOC = (LoginChild) => {
  class LoginParent extends React.Component {
    static propTypes = {
      actions: PropTypes.shape({
        login: PropTypes.func.isRequired
      }).isRequired,
      auth: PropTypes.shape({
        authenticating: PropTypes.bool,
        isAuthenticated: PropTypes.bool,
        error: PropTypes.bool,
        errorMessage: PropTypes.string
      }).isRequired
    };

    static defaultProps = {
      auth: {
        authenticating: false,
        isAuthenticated: false,
        error: false,
        errorMessage: null
      }
    };

    constructor() {
      super();

      this.state = {
        username: '',
        password: ''
      };
    }

    handleOnChange = (e) => {
      const { name, value } = e.target;

      if (name && (this.state[name] !== value || !this.state[name])) {
        this.setState({
          [name]: value,
        });
      }
    }

    handleOnSubmit = (e) => {
      e.preventDefault();

      const { username, password } = this.state;

      this.props.actions.login({ username, password });
    }

    render() {
      const { username, password } = this.state;
      return (
        <div>
          <LoginChild
            username={username}
            password={password}
            auth={this.props.auth}
            handleOnChange={this.handleOnChange}
            handleOnSubmit={this.handleOnSubmit}
          />
        </div>
      );
    }
  }

  const mapStateToProps = ({ auth }) => ({ auth });

  const mapDispatchToProps = dispatch => {
    return {
      actions: bindActionCreators(authActions, dispatch)
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(LoginParent);
};

export default LoginHOC;
