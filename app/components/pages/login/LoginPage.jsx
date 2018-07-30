import React from 'react';
import LoginNavigation from '../navbar/LoginNavigation';
import LoginFormMain from './LoginFormMain';
import { APP } from '../../../constants';

import './LoginPage.css';

export default class LoginPage extends React.Component {

  render() {
    return (
      <section className="login-page">
        <LoginNavigation />
        <div className="container login-page-container">
          <div className="login-page-container-card-container">
            <img
              className="login-page-container-card-container-img"
              src={APP.USER.DEFAULT_IMG}
            />
            <LoginFormMain />
          </div>
        </div>
      </section>
    );
  }
}
